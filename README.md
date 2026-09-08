# Miguel Portfolio

A single-page developer portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your [Resend](https://resend.com) API key |
| `CONTACT_EMAIL` | Email address that receives contact form submissions |
| `FROM_EMAIL` | Verified sender address in Resend (defaults to `onboarding@resend.dev` for testing) |

Never commit `.env.local`. It's already in `.gitignore`.

## Editing content

Project data, services, client names, and other copy live in `lib/data.ts`. Update that file to change content without touching component logic.

## Scripts

- `npm run dev`: start development server
- `npm run build`: production build
- `npm run start`: start production server
- `npm run lint`: run ESLint

## Contact form

The contact form POSTs to `/api/contact`, which validates and sanitizes input server-side, applies in-memory rate limiting (5 requests per 10 minutes per IP), and sends email via Resend.

For higher traffic, replace the in-memory rate limiter in `lib/rate-limit.ts` with a persistent store like Upstash Redis.
