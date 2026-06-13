# PM Daily Project Context

This document is the single source of truth for the PM Daily product, architecture, build state, and next implementation work.

## Product identity

PM Daily is a challenge-led learning and portfolio platform for product managers.

It is not a traditional LMS, course marketplace, or static syllabus tracker. The product helps PMs build practical skill by solving realistic daily problems, creating artifacts, publishing selected evidence, and learning with peers.

Core promise:

> Become a stronger PM, one real challenge at a time.

Core loop:

```text
Choose a PM growth path
→ open today's mission
→ solve three connected problems
→ create an artifact
→ reflect
→ save progress
→ publish selected evidence
→ receive peer feedback
→ demonstrate skill growth
```

## Strategic references

The Product Folks and HelloPM are inspiration references only. PM Daily should not copy their branding, layouts, imagery, language, navigation, or visual identity.

Borrowed principles:

- Clear community energy
- Strong learning outcomes
- Visual discovery
- Career-relevant artifacts
- Outcome-led modules
- Trust through practical work

PM Daily's original position:

> A challenge-led Skills OS for PMs, combining daily practice, calendar-linked workflows, evidence portfolios, and peer growth.

## Product principles

1. One clear next action per screen.
2. Summary first, details on demand.
3. Every day should produce tangible evidence.
4. Skills are backed by artifacts, not arbitrary percentages.
5. Nothing becomes public automatically.
6. Calendar events must deep-link to the exact day workspace.
7. Community should reward useful contribution, not vanity metrics.
8. Auth, newsletter consent, founding access, and payment entitlement are separate concepts.
9. The interface should be visual, editorial, and friendly, not a default dashboard.
10. The system should remain usable before all backend services are active.

## Target users

### Aspiring PM

Needs structured practice, interview evidence, and a portfolio.

### Working PM

Needs practical strengthening across product, technology, data, and AI through short, realistic challenges.

### Senior PM moving into AI or platform work

Needs deeper systems thinking, AI product judgment, and evidence of applied decision-making.

### Peer reviewer or mentor

Wants to review artifacts, give structured feedback, and build community reputation.

### Admin and content editor

Creates paths, days, problem packs, prompts, rubrics, resources, email campaigns, and moderation decisions.

## Growth paths

The first user-facing paths are:

1. Product Craft
2. Technical PM
3. AI Product PM
4. Portfolio Builder

Each path should show:

- Promise and outcome
- Skills practiced
- Artifact types produced
- Two-week sample journey initially
- Daily missions
- Three connected problems per day
- Final artifact for each day

## Daily challenge model

Every challenge day contains exactly three connected problems:

1. Diagnose
2. Decide
3. Build

The three problems are not random questions. They must build toward one artifact.

Example structure:

```text
Day: Improve login success
Problem 1: Diagnose the funnel drop-off
Problem 2: Choose the first intervention
Problem 3: Build the improved flow and experiment plan
Artifact: Login Success Improvement Case Study
```

Completion rules:

- Problem 1 response saved
- Problem 2 response saved
- Problem 3 response saved
- Reflection completed
- Artifact draft created

Proof should be required before public portfolio publishing, but not before private completion.

## Core journeys

### Journey 1: Public discovery

```text
Landing page
→ choose a path
→ view the path outcome
→ preview the first week
→ open a sample day
```

### Journey 2: Sign in

```text
Enter email
→ receive magic link
→ click magic link
→ return to intended page
→ profile exists
→ continue selected path
```

Authentication uses Supabase magic links. Newsletter consent is separate from account creation.

### Journey 3: Core learning

```text
Choose path
→ open week view
→ open day
→ solve Diagnose
→ solve Decide
→ solve Build
→ review generated artifact draft
→ reflect
→ complete day
→ resume later if needed
```

### Journey 4: Calendar pass

```text
Choose path
→ select start date and weekdays
→ generate one .ics file
→ import calendar
→ each event opens exact PM Daily day
```

One calendar event per day. Do not create three events for the three problems.

### Journey 5: Portfolio

```text
Complete day
→ artifact draft is created
→ edit case study
→ attach evidence
→ choose visibility
→ publish or keep private
```

Visibility states:

- Private
- Draft
- Unlisted
- Public

### Journey 6: Community

```text
Publish or prepare artifact
→ request peer review
→ spend review credit
→ receive structured feedback
→ revise artifact
→ mark feedback helpful
```

## Monetization model

The PM Daily Calendar Learning Pass unlocks the full scheduled learning experience.

Founding model:

- First 1,000 verified users can explicitly claim free lifetime access.
- Newsletter signups do not consume a founding spot.
- Founding access must be granted atomically server-side.

After the first 1,000:

- One-time price: ₹199
- Lifetime access
- Not a subscription

Razorpay will handle the future payment flow.

## Email model

Auth email is not the same as newsletter email.

Separate email preferences:

- Weekly PM challenge
- Product, technology, and AI newsletter
- Challenge reminders
- Peer review notifications
- Monthly progress summary

Nothing should be preselected by default.

## Current repository and deployment state

Repository:

```text
asitmohanty2025-bit/pm-daily
```

Hosting:

- Vercel Hobby plan
- Production branch: main
- Supabase is connected by the user

Current completed release:

- Release 0 foundation
- Release 1 visual public experience
- Landing page
- Explore page
- Sample challenge route
- Community page
- How it works page
- Sign-in visual shell
- shadcn-compatible primitive setup
- Supabase schema and Edge Function placeholders
- Vercel build fix excluding Supabase Deno functions from Next.js TypeScript scope

Important current limitation:

- Sign-in page is currently a visual form only and does not call Supabase yet.
- Path cards currently link to `/explore?path=slug`, but no path detail route reads that parameter.
- The sample challenge is interactive, but full path-to-week-to-day navigation is not yet implemented.
- Supabase tables exist in migration files, but runtime auth and persistence wiring still needs implementation.

## Technical stack

Frontend:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui style open-code primitives
- Lucide icons
- Server components by default
- Client components only where interaction is required

Backend:

- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security
- Supabase Storage later
- Supabase Edge Functions later
- Resend later
- Razorpay later

Hosting:

- Vercel

## Optimization rules

1. Keep path and content pages server-rendered where possible.
2. Hydrate only the problem workspace and forms that need browser state.
3. Use local storage fallback for progress before Supabase sync.
4. Sync to Supabase only when the user is authenticated.
5. Avoid heavy animation libraries unless required.
6. Avoid adding large dependencies for simple state or UI behavior.
7. Keep daily workspace focused on one active problem at a time.
8. Avoid rendering the entire syllabus on the landing page.
9. Preserve mobile-first navigation.
10. Do not require Supabase for public browsing.

## Supabase expectations

Supabase is needed for:

- Magic-link auth
- Auth callback route
- Session refresh middleware/proxy
- Profile creation
- Email preferences
- Saved learning progress
- Saved problem responses
- Artifacts
- Future entitlements and payments

Supabase is not needed for:

- Public landing page
- Static path browsing
- Static day previews
- Local-only sample challenge

Environment variables expected in Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
```

Future environment variables:

```text
RESEND_API_KEY
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
```

## Database model already planned

Identity and consent:

- profiles
- email_preferences

Learning content:

- learning_paths
- challenge_days
- daily_problems
- skills
- challenge_skills

User learning:

- learning_plans
- plan_days
- problem_responses

Portfolio:

- artifacts
- artifact_blocks

Commerce:

- entitlements
- founding_counter
- payments later

Security:

- RLS on all user data tables
- Public reads only for published content
- Users manage only their own records

## Immediate next implementation scope

This is the next focused release and should be built before payment, portfolio publishing, leaderboard, or peer review.

### Release 2: core journey and auth

Goals:

1. Wire Supabase magic-link sign-in.
2. Add auth callback route.
3. Preserve return destination after sign-in.
4. Add functional path detail pages.
5. Add week and day views for all four paths.
6. Add interactive three-problem daily workspace.
7. Autosave progress to local storage.
8. If signed in, sync problem responses to Supabase.
9. Create or update user profile after auth.
10. Keep newsletter consent separate.
11. Make mobile menu usable.
12. Avoid unnecessary client-side hydration.

Suggested routes:

```text
/path/[pathSlug]
/path/[pathSlug]/week/[weekNumber]
/path/[pathSlug]/day/[dayNumber]
/auth/callback
/onboarding
/today
```

Fallback behavior:

- Anonymous users can explore paths and try daily work locally.
- Signed-in users can persist progress.
- If Supabase env vars are missing, sign-in should show a clear setup message instead of failing silently.

## Expected product behavior after Release 2

A user should be able to:

1. Open PM Daily.
2. Choose a path.
3. See the path journey and daily missions.
4. Open a day.
5. Complete Diagnose, Decide, and Build.
6. See progress state update.
7. Leave and return later.
8. Sign in with email.
9. Resume the intended page after clicking the magic link.
10. Save progress to Supabase when authenticated.

## Later modules

After the core journey works:

### Calendar Learning Pass

- Calendar setup
- .ics export
- Deep links in every event
- Founding 1,000 claim
- ₹199 Razorpay unlock

### Live portfolio

- Artifact editor
- Private uploads
- Public profile
- Public artifact pages
- LinkedIn sharing

### Community

- Streaks
- Points ledger
- Weekly opt-in leaderboards
- Peer review credits
- Review pool
- Structured review rubrics
- Moderation tools

### Admin studio

- Content import
- Challenge authoring
- Prompt/rubric editing
- Publish workflow
- Campaigns
- Moderation

## UX rules

- One prominent primary action per screen.
- Use progressive disclosure.
- Show the current problem only.
- Keep the final artifact visible as the finish line.
- Avoid long walls of explanatory text.
- Show summaries first.
- Never show raw spreadsheet rows in the main user experience.
- Make every screen answer:
  - Where am I?
  - What do I do next?
  - Why does this matter?
  - What will I create?

## Privacy and safety rules

- Nothing public by default.
- Do not expose emails, user IDs, auth tokens, payment info, or private responses in URLs.
- Calendar deep links must use opaque identifiers.
- Public artifacts should include only user-approved content.
- Leaderboards must be opt-in.
- Peer review should support report/block/moderation.

## Current product truth

The product is transitioning from a strong visual prototype to a working core learning product.

The next code work should prioritize:

1. Real sign-in
2. Real path journey
3. Real day workspace
4. Local progress fallback
5. Supabase progress sync

Do not prioritize payment, leaderboards, or portfolio publishing until the core learning journey feels reliable.
