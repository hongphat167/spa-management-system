# Spa Management Frontend

Next.js 15 admin dashboard frontend for the Spa Management System.

## Tech

- Next.js 15 (App Router)
- React 19 + TypeScript (strict)
- Tailwind CSS 4
- shadcn/ui style components
- TanStack Query v5
- Axios + global interceptors
- Zustand auth store
- React Hook Form + Zod

## Development

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

## Build

```bash
npm run lint
npm run build
```

## Deployment

Deploy directly to Vercel (`vercel.json` included). Configure `NEXT_PUBLIC_API_BASE_URL` in project environment variables.
