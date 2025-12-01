# Agathe Coulombier Portfolio

A modern portfolio website built with Next.js, featuring:
- Internationalization (French/English with automatic language detection)
- Liquid distortion effect on hero image using WebGL
- Smooth animations with Framer Motion
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
```

## Deployment to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect Next.js and configure the build settings
5. Click "Deploy"

The language detection works automatically:
- French browsers will see the French version
- All other languages default to English

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with i18n provider
│   └── page.tsx         # Main page
├── components/
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Projects.tsx     # Projects section
│   ├── Contact.tsx      # Contact section
│   ├── LiquidDistortionCanvas.tsx  # WebGL effect
│   ├── LocaleSwitcher.tsx          # Language toggle
│   ├── WaveDivider.tsx  # SVG wave divider
│   ├── CrossText.tsx    # Interactive text component
│   └── Crosshair.tsx    # Custom cursor
├── i18n/
│   ├── config.ts        # i18n configuration
│   └── request.ts       # Server-side locale detection
└── messages/
    ├── en.json          # English translations
    └── fr.json          # French translations
```

## Customization

### Adding Images
Place your background image at:
```
public/waves/Water_reflexions_cph_april22-3.jpg
```

### Modifying Translations
Edit the JSON files in `src/messages/` to update text content.

### Changing Colors
Modify the color palette in `tailwind.config.ts`.

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **next-intl** - Internationalization
- **WebGL** - Liquid distortion effect
