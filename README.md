# Portfolio Application — Full Stack

This workspace contains a full-stack portfolio application (client + server).

What's included

- Backend: Express + Mongoose (in `server/`) with JWT authentication (signin/signout), role support (user/admin), and API endpoints for contacts, projects, qualifications, and users.
- Frontend: Vite + React (in `client/`) with forms, auth helper, admin dashboard and role-aware UI.

Quick setup & run (Windows PowerShell)

1. Install dependencies (root and client):

```powershell
# From repo root
npm install
cd client
npm install
cd ..
```

2. Seed admin user (optional — creates `admin@portfolio.com` / `Admin@123` unless you override env vars):

```powershell
npm run seed-admin
```

3. Start the app for development:

Open two shells (recommended):

Shell 1 (backend):

```powershell
# from repo root
node server.js
```

Shell 2 (frontend):

```powershell
cd client
npm run dev
```

Note: The client `npm run dev` script runs both Vite and `nodemon ../server.js` using `concurrently`. If you prefer starting backend separately, run `node server.js` (or `nodemon server.js`) from the repo root.

Seeding and env vars

- By default the seed script creates `admin@portfolio.com` / `Admin@123`.
- To override, set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` before running the seed script.

Example (PowerShell):

```powershell
$env:ADMIN_EMAIL = 'me@host.com'; $env:ADMIN_PASSWORD='MyPass123'; npm run seed-admin
```

What I implemented for assignment requirements

- Backend JWT-based signin/signout; `requireSignin` and `isAdmin` middlewares.
- `role` field on `User` model (enum `user|admin`).
- Admin-only protections for create/update/delete of projects and qualifications; contact POST is public.
- Frontend auth helper stores `{ token, user }` in `localStorage`.
- Admin dashboard (`client/src/admin/Admin.jsx`) to list and delete Contacts/Projects/Qualifications.
- Frontend changes so non-admins can view lists and admins can create items.
- Contact form shows success/error messages after submission.

Next recommended steps (I can do these next):

- Add edit/update UI for admin to modify items.
- Add confirmation dialogs and toast notifications for better UX.
- Run full end-to-end tests and produce the Word doc screenshots and ZIP for submission.

If you want, I can continue now with any of the next steps and run through an admin sign-in + create/delete flow and capture screenshots.
