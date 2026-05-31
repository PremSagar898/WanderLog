# WanderLog

WanderLog is a small travel bucket list app built with React and Vite. It lets users sign in, browse real country data, and keep track of places they want to visit or have already visited.

## What’s inside

- Login flow with a Reqres-based auth demo.
- Protected routes with session persistence.
- Country search, filtering, and detail views.
- Personal bucket lists for Want to Visit and Visited.
- Local storage so each user keeps their own progress.

## Tech stack

- React
- Vite
- React Router
- REST Countries API
- Reqres API

## Run locally

```bash
npm install
npm run dev
```

## Environment

If you have a Reqres API key, add it to `.env`:

```bash
VITE_REQRES_API_KEY=your_key_here
```

The app also works without the key by using the local demo auth fallback.

## Demo credentials

- Email: `eve.holt@reqres.in`
- Password: `cityslicka`

## Notes

- The country list and detail pages use live REST Countries data.
- Bucket list items are saved per user in `localStorage`.
- The current UI is tuned to stay simple, readable, and close to the provided reference.
