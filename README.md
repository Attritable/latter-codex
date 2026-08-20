# Latter Codex

A Worlds Without Number companion for creating and keeping **heroes** and **campaign worlds**.

Roll a character (attributes, background, class, foci, arts, kit) or build a campaign atlas (world → nations → region → kingdom, with courts, ruins, values, and a generated map). Sign in with Google or X to save a library; guests can still generate freely in the current tab.

## Stack

- TanStack Start / Router / React 19
- Tailwind CSS v4
- Better Auth (Google + X via the Grok auth broker)
- Postgres when `DATABASE_URL` is set, otherwise embedded PGLite in preview

## Develop

```bash
npm install
npm run dev
```

App listens on `http://localhost:8080`.

```bash
npm run typecheck
npm run build
```

## Notes

- Worlds Without Number tables and rules text are used for play aids. The game itself is © Sine Nomine Publishing.
- Sign-in is real. Set `VITE_AUTH_ENABLED=false` only if you want a local dev user and no login.
- Do not commit a `.env` with secrets. Deployed hosts inject `DATABASE_URL` and auth client credentials.
