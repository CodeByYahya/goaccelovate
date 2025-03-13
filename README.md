# Project Name: Next.js Auth & Todo App

## Overview
A web app using Next.js, Prisma, PostgreSQL, and NextAuth for Google authentication.

## Features
- Google Auth with NextAuth
- CRUD for Todos (Create, Read, Update, Delete)
- Users and Todos Relation (via Prisma & Neon)

## Technologies
- Next.js
- Prisma
- PostgreSQL
- NextAuth.js

## Setup
1. Clone and install dependencies:
```bash
git clone <your-repo-url>
cd project-name
npm install
```
2. Configure `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```
3. Setup Prisma:
```bash
npx prisma generate
npx prisma migrate dev --name init
```
4. Run the server:
```bash
npm run dev
```

## Testing
Run tests with:
```bash
npm run test
```

## Database
A PostgreSQL dump is included in `/db/dump.sql`.

## URL
[https://your-app-url.vercel.app](https://your-app-url.vercel.app)

## License
MIT

