# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- ⚡️ Vite for fast development and optimized builds
- ⚛️ React 18+ with TypeScript
- 🎨 Tailwind CSS for styling
- 🌓 Dark/Light theme with Material Deep Ocean palette
- 🎭 Framer Motion for smooth animations
- 📱 Fully responsive design
- ♿️ Accessibility-focused

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI, Aceternity UI
- **Animations**: Framer Motion
- **Fonts**: Manrope (headings), Inter (body text)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
portfolio-website/
├── src/
│   ├── components/      # React components
│   │   └── ui/         # Shadcn UI components
│   ├── contexts/       # React contexts (theme, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── data/           # Portfolio data
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
└── ...config files
```

## Theme

The portfolio uses the Material Deep Ocean color palette for dark mode:

- Background: `#0f111a` (Deep dark blue-black)
- Foreground: `#e4f0fb` (Light blue-white)
- Primary: `#82aaff` (Bright blue)
- Secondary: `#c792ea` (Purple)
- Accent: `#89ddff` (Cyan)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

MIT
