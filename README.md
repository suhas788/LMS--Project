# Backend (Node + Express + Sequelize + MySQL)

Quick steps to run the backend for the frontend in this repo.

1. Copy `.env.example` to `.env` and set MySQL credentials.
2. Install deps: `npm install`
3. Create the database named in `DB_NAME`.
4. Start the server: `npm run start` (or `npm run dev` to use nodemon).

The server listens by default on port `3001` and exposes `/api/*` routes used by the frontend.

Demo users are not auto-seeded here; you can insert them via `seed.sql` or register via `/api/auth/register`.
