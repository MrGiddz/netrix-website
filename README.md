# Netrix Systems Limited Website

Marketing site for Netrix Systems Limited, built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Getting started

```sh
npm install
npm run dev
```

The development server runs on `http://localhost:8080` by default.

## Available scripts

```sh
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vitest
- Playwright

## Vercel deployment (frontend + admin)

This repository is deployed as two separate Vercel projects:

1. Frontend project (Vite app)
	 - Root Directory: `.` (repo root)
	 - Uses `vercel.json` at repo root
	 - Build output: `dist`

2. Admin project (Next.js app)
	 - Root Directory: `admin`
	 - Uses `admin/vercel.json`

Required environment variables:

- Frontend project
	- `VITE_API_URL`: deployed admin base URL (for example `https://your-admin-project.vercel.app`)
	- `VITE_SITE_URL`: deployed frontend URL

- Admin project
	- Add your server-side variables (`MONGODB_URI`, SMTP/email settings, and any API secrets used by the admin app)

Do not use localhost URLs in Vercel production environments.
