# TRACE — Scam Safety Interface

A multi-file Next.js project for a scam-safety experience. The visual direction is a dark, editorial interface with neon-lime signal motifs, scroll reveals, a 3D shader orb, and an interactive message pattern checker.

## Stack

- Next.js App Router + React + TypeScript
- Three.js + React Three Fiber + Drei for the interactive 3D signal orb
- Custom GLSL vertex/fragment shaders for the animated orb surface
- GSAP + ScrollTrigger for entrance, scroll reveal, and parallax animations
- Node.js runtime through a Next.js Route Handler at `/api/analyze`
- Optional PostgreSQL/Prisma schema for aggregate analysis events only; no message content is stored by the demo

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## PostgreSQL (optional)

The current experience does not require a database. The checker analyses text in memory and does not persist it. If you later decide to record aggregate events, configure `DATABASE_URL` using `.env.example`, install Prisma (`npm install prisma @prisma/client`), then run `npx prisma generate` and `npx prisma db push`. Review privacy requirements before adding analytics or storage.

## GitHub upload

Create a repository named `TRACE-Scam-Safety`, then from this project folder run:

```bash
git init
git add .
git commit -m "Build TRACE scam safety experience"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/TRACE-Scam-Safety.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Do not upload `.env` files or credentials.

## Deployment note

This is a Next.js app, not a single static HTML file. Deploy it to a Node.js-compatible host (for example Vercel or another Next.js host). GitHub Pages does not run Next.js server route handlers by itself.

## Important limits

The checker is an educational heuristic, not a verified fraud detection service. It does not query live threat intelligence, validate sender identity, or guarantee that a message is safe. No message is written to a database in this demo.
