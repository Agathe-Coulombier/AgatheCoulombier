'use client';
import { useRef, useEffect } from 'react';

export default function LiquidDistortionCanvas({ imageSrc }: { imageSrc: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    if (!gl) {
      console.error('WebGL not supported, falling back to plain image');
      return;
    }

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    // Fragment shader with liquid distortion
    const fragmentShaderSource = `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_hover;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        
        // Calculate distance from mouse
        float dist = distance(uv, u_mouse);
        
        // Create liquid ripple effect - more focused and powerful
        float ripple = sin(dist * 35.0 - u_time * 4.0) * 0.5 + 0.5;
        float strength = smoothstep(0.3, 0.0, dist) * u_hover * 0.1; // More focused (0.25) and stronger (0.15)
        
        // Distort UV coordinates with waves - more powerful effect
        vec2 distortion = vec2(
          sin(uv.y * 12.0 + u_time * 1.5) * strength * ripple,
          cos(uv.x * 12.0 + u_time * 1.5) * strength * ripple
        );
        
        uv += distortion;
        
        gl_FragColor = texture2D(u_texture, uv);
      }
    `;

    // Compile shader
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    // Create program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 1,
      1, 1,
      0, 0,
      1, 0,
    ]), gl.STATIC_DRAW);

    // Get attribute locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

    // Get uniform locations
    const textureLocation = gl.getUniformLocation(program, 'u_texture');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const hoverLocation = gl.getUniformLocation(program, 'u_hover');

    // Load and create texture
    const texture = gl.createTexture();
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    // Mouse tracking
    let mouseX = 0.5;
    let mouseY = 0.5;
    let hover = 0;
    let targetHover = 0;
    let lastMouseMoveTime = 0;
    const fadeOutDelay = 1000; // 1 second delay before starting fade out

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is within canvas bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseX = x / rect.width;
        mouseY = y / rect.height;
        targetHover = 1;
        lastMouseMoveTime = Date.now(); // Update last mouse move time
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      
      // Only set hover to 0 if truly outside the canvas area
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        lastMouseMoveTime = Date.now(); // Start the fade-out timer
      }
    };

    // Use window-level events to track mouse even when over links
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Resize handler
    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationId: number;
    const startTime = Date.now();

    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      
      // Check if enough time has passed since last mouse movement
      const timeSinceLastMove = Date.now() - lastMouseMoveTime;
      if (timeSinceLastMove > fadeOutDelay) {
        targetHover = 0; // Start fading out after delay
      }
      
      // Smooth hover transition with slower fade out
      const transitionSpeed = targetHover === 1 ? 0.075 : 0.02; // Slower fade out (0.02 vs 0.075)
      hover += (targetHover - hover) * transitionSpeed;

      // Clear canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Bind position buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // Bind texcoord buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

      // Set uniforms
      gl.uniform1i(textureLocation, 0);
      gl.uniform2f(mouseLocation, mouseX, mouseY);
      gl.uniform1f(timeLocation, time);
      gl.uniform1f(hoverLocation, hover);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [imageSrc]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block', pointerEvents: 'none' }}
      />
    </div>
  );
}
