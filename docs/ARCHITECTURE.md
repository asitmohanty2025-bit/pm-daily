# PM Daily architecture

## Current implemented release

- Next.js App Router application shell
- Custom PM Daily design system built on shadcn-style open-code primitives
- Visual public landing page
- Explore, sample challenge, community, how-it-works, and sign-in routes
- Working client-side three-problem sample challenge
- Supabase SSR client foundation
- Initial Postgres schema, RLS policies, seed data, and Edge Function contracts

## Boundaries

- Server Components render public content and SEO pages.
- Client Components are limited to interactions such as the challenge workspace, animated hero, and skill map.
- Supabase owns authentication, database, storage, realtime, and server functions.
- Payment and founding entitlement mutations are server-only.
- Calendar exports will be generated from server-validated learning plans.

## Required next implementation

1. Activate Supabase and magic-link auth.
2. Build content studio/import pipeline.
3. Curate the flagship 50-day path into three-problem challenge packs.
4. Add learning plan creation and `.ics` generation.
5. Add Razorpay entitlement workflow.
6. Add artifact editor and storage.
7. Add points, streaks, leaderboards, and peer review.
