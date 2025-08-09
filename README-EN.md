**English** | [简体中文](README.md)

# dusk-awaits

A full-stack React app template built with React Router, supporting server-side rendering (SSR).

## Tech Stack

- React 19 + React DOM
- React Router 7 (@react-router/dev for build, data loading and mutations)
- Vite 6 (dev and build)
- TypeScript 5 (strict mode)
- Tailwind CSS v4 (preconfigured)
- Node.js (Docker base image: Node 20)

## Quick Start

Recommend Node 18+ (20+ preferred).

### Install Dependencies

This repo includes `pnpm-lock.yaml`, but you can also use npm. Choose one:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm (will generate package-lock.json)
npm install
```

### Development (HMR)

```bash
npm run dev
```

Runs at http://localhost:5173 by default (Vite).

### Typecheck

```bash
npm run typecheck
```

### Build

```bash
npm run build
```

Build output is in `build/`:
- `build/client` static assets
- `build/server` SSR server entry (`index.js`)

### Production Run (local)

```bash
# Build first
npm run build

# Start SSR server (defaults to port 3000; override with PORT)
npm run start
# or: PORT=8080 npm run start
```

The server listens on port 3000 by default, served by `react-router-serve ./build/server/index.js`.

## Docker Deployment

This project includes a multi-stage Dockerfile (Node 20 Alpine).

```bash
docker build -t dusk-awaits .

# The app listens on 3000 by default
# Map the container port to the host
docker run -p 3000:3000 dusk-awaits
```

Note: The Dockerfile uses `npm ci` and expects `package-lock.json`. If you use pnpm, either generate `package-lock.json` locally with `npm install` before building, or adapt the Dockerfile for pnpm.

Deploy to any container platform (e.g., AWS ECS, Cloud Run, Azure Container Apps, Fly.io, Railway, etc.).

## Configuration & Features

- SSR is enabled: see `react-router.config.ts` with `ssr: true`
- Vite plugins: `@react-router/dev/vite`, `@tailwindcss/vite`, `vite-tsconfig-paths`
- TypeScript path alias: `~/* -> ./app/*`

## Project Structure (excerpt)

```
app/
  routes/
    home.tsx
    echo-chamber.tsx
    twilight-plaza.tsx
  utils/
    data-manager.ts
  welcome/
    welcome.tsx
public/
  favicon.ico
```

- Routes and pages live in `app/routes/`
- Shared utilities in `app/utils/`
- UI & styles: Tailwind v4 is configured; extend in `app/app.css`

## Available Scripts

- `npm run dev`: development mode (HMR)
- `npm run build`: production build
- `npm run start`: start production server (using build output)
- `npm run typecheck`: type generation + TS checks

## FAQ

- Ports:
  - Development: Vite defaults to 5173
  - Production: defaults to 3000 (override with `PORT`)
- Using pnpm with Docker: adjust the Dockerfile (or generate `package-lock.json` via npm before building).

---

Made with ❤️ using React Router.
