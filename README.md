# WanderLog

WanderLog is a clean travel bucket list app built with React and Vite. Users can sign in, explore live country data, and save places they want to visit or have already visited.

## Live Site

- https://wander-log-sigma.vercel.app/auth

## Project Overview

- Sign in with a Reqres-based demo auth flow.
- Browse live country data from the REST Countries API.
- Search, filter, and open country detail pages.
- Manage personal Want to Visit and Visited lists.
- Keep progress per user with `localStorage`.

## Workflow

1. Open the auth page and sign in.
2. Load countries from the REST Countries API.
3. Search or filter the explore page.
4. Open a country detail page.
5. Add countries to Want to Visit or Visited.
6. Save each user’s progress locally.

## Folder Structure

```text
wanderlog/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Tech Stack

- React
- Vite
- React Router
- REST Countries API
- Reqres API

## Run Locally

```bash
npm install
npm run dev
```

## Environment

If you have a Reqres API key, add it to `.env`:

```bash
VITE_REQRES_API_KEY=your_key_here
```

If no key is set, the app uses the built-in demo auth fallback.

## Demo Credentials

- Email: `eve.holt@reqres.in`
- Password: `cityslicka`

## Deployment Notes

- Live app: (https://wander-log-weld.vercel.app/auth)
- Country and detail pages use live REST Countries data.
- All bucket list changes are stored per user in `localStorage`.
