# FightReady 🥊

An AI-powered combat sports performance SaaS platform built for combat athletes.

## Live Demo
[fightready-git-main-virendar-s-projects.vercel.app](https://fightready-git-main-virendar-s-projects.vercel.app)

## Features

- **Weight Cut Tracker** — Log daily weight, track progress toward weigh-in goal with AI insights
- **Nutrition Manager** — Track calories, protein, carbs and fat with daily meal plans
- **Hydration Manager** — Monitor water intake with circular progress ring and AI reminders
- **Supplement Planner** — Daily supplement schedule with timing and dosage tracking
- **Fight Camp Planner** — Structured 8-week camp timeline from base building to fight day
- **AI Fight Coach** — Conversational AI coach with personalized fight camp guidance
- **Performance Analytics** — Weekly charts and trend analysis with Recharts
- **Fight Record** — Competition history, win/loss record and career stats

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS, Shadcn UI, Recharts
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Supabase)
- **Auth:** Clerk
- **Deployment:** Vercel

## Getting Started

```bash
git clone https://github.com/v1rendar/fightready.git
cd fightready
npm install
```

Add your environment variables to `.env.local`:

```
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

```bash
npx prisma migrate dev
npm run dev
```

## Built By

Virendar Vissamsetti — competitive kickboxer and software developer
