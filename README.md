# FiveMatter Brand Blueprint & Design System

The official brand foundation, visual language, design system, and digital brand guidelines for **FiveMatter** (_Focus. Solve. Scale._).

FiveMatter connects People, Process, Data, Technology, and Governance as one operating system so transformation creates capability, not dependency.

---

## 🚀 Features

- **Brand Foundation & Story**: Purpose, mission, vision, and core principles.
- **The Five Dimensions**: People, Process, Data, Technology, and Governance.
- **Tone of Voice**: Direct, precise, and partner-centric messaging rules.
- **Logo Usage & Guidelines**: Wordmark clearspace, approved color grounds, sizing, and rules.
- **Color System**: Primary palette (Black, White, Paper, Cobalt) and dimension scales.
- **Typography Hierarchy**: Space Grotesk for display / headlines and Inter for body text.
- **Applications & Mockups**: Real-world templates for letterheads, business cards, email signatures, presentations, and proposals.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router)
- **Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev) & [Nitro](https://nitro.unjs.io)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org)

---

## 💻 Getting Started

### Prerequisites

- Node.js (v20 or newer recommended)
- npm (or bun / pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# Install dependencies
npm install
```

### Development Server

Run the development server locally:

```bash
npm run dev
```

The application will be accessible at `http://localhost:8080`.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This will compile:

- **Static Assets & Prerendered HTML**: Located in `.output/public/` (includes `index.html`, `404.html`, `.nojekyll`, and optimized assets).
- **Server Bundle (SSR)**: Located in `.output/server/` for Cloudflare Workers / Node.

### Previewing the Production Build

```bash
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

This repository includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the site to GitHub Pages on every push to the `main` branch.

### Enabling GitHub Pages in Your Repository:

1. Push this repository to GitHub.
2. Go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Push a commit to the `main` branch, or trigger the workflow manually in the **Actions** tab.
5. Your brand guidelines site will be live at `https://<username>.github.io/<repo-name>/`!

---

## 📄 License

Private & Confidential © FiveMatter. All rights reserved.
