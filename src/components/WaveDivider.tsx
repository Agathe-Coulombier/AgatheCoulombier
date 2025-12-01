'use client';

interface WaveDividerProps {
  className?: string;
}

export default function WaveDivider({ className = '' }: WaveDividerProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,64 C288,120 576,0 864,64 C1152,128 1296,32 1440,64 L1440,120 L0,120 Z"
        fillOpacity="1"
      />
    </svg>
  );
}
