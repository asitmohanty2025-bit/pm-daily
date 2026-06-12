# PM Daily — Authoritative Product Context

_Last updated: 13 June 2026_

This file is the normative product and implementation context for PM Daily.

Where older prompts, documents, prototypes, or generated plans conflict with this file, this file takes precedence. The product owner may change these decisions explicitly in a later commit.

## 1. Product identity

**Product:** PM Daily  
**Descriptor:** Learning by shipping  
**Primary promise:** Become a stronger PM, one real challenge at a time.  
**Category:** Challenge-led learning, practice, evidence, portfolio, and peer-growth product for product managers.

PM Daily is **not an LMS**.

Do not turn it into:

- a course catalogue;
- a video-learning portal;
- a chapter-and-lesson interface;
- a certification or grading platform;
- a school-administration product;
- a generic SaaS dashboard;
- a permanent-sidebar admin interface.

The product exists to help PMs practise judgment, solve realistic problems, create evidence, publish selected work, and improve through reflection and peer feedback.

## 2. Core product loop

The user-facing loop is:

`Choose a path → Open today’s challenge → Diagnose → Decide → Build → Reflect → Ship evidence → Review growth → Learn with peers`

The daily problem-solving loop is:

`Diagnose → Decide → Build`

The broader evidence loop is:

`Study → Practise → Ship → Prove → Reflect → Improve`

These are compatible views of the same product and must not be presented as separate learning models.

## 3. Product principles

1. One clear next action per screen.
2. Summary first; detail on demand.
3. Every learning day produces tangible evidence.
4. Skills are backed by completed work, not arbitrary percentages.
5. Nothing becomes public automatically.
6. Calendar events open the exact scheduled challenge.
7. Community rewards helpful contribution, not vanity activity.
8. Authentication, newsletter consent, and payment entitlement are separate.
9. The interface is editorial, visual, and PM-specific.
10. The complete spreadsheet remains the content source, but the product reveals it progressively through curated paths.
11. The base learning experience must work without an LLM API.
12. Prefer low recurring cost, simple operations, and portable user data.

## 4. Superseded assumptions

Earlier documents described a static-only product with no account, no backend, Vite, and IndexedDB as the final architecture. Those constraints are now superseded.

The current authoritative architecture is:

- Next.js App Router;
- React and TypeScript;
- Tailwind CSS;
- shadcn/ui open-code primitives;
- Supabase Auth, Postgres, Storage, Realtime, Edge Functions, and Cron;
- Vercel hosting;
- Resend for newsletters and engagement email;
- Razorpay for the future one-time payment.

However, PM Daily must retain **local-first resilience**:

- public content is server-rendered or statically rendered;
- current challenge drafts autosave locally;
- browsing and sample challenges should still work without sign-in;
- signed-in users synchronize progress to Supabase;
- temporary connectivity loss must not destroy responses;
- cloud sync must not make the UI slower or block basic interaction.

Therefore the product is now **hybrid local-first with cloud persistence**, not static-only and not cloud-dependent for every interaction.

## 5. Primary users

### Aspiring PM

Needs structured practice, interview evidence, and visible work.

### Working PM

Needs practical growth in product craft, technology, data, and AI.

### Senior PM moving into AI or platform work

Needs deeper technical and AI product judgment with proof of applied work.

### Peer reviewer or mentor

Wants to review artifacts, help others, and build a reputation for useful feedback.

### Administrator or content editor

Creates paths, days, problem packs, prompts, rubrics, resources, campaigns, and moderation decisions.

## 6. Product tiers

### Public visitor

Can:

- view the landing page;
- explore paths;
- preview selected challenges;
- complete a sample challenge locally;
- view public portfolios;
- subscribe to newsletters;
- share PM Daily.

### Free verified account

Can:

- sign in with an email magic link;
- save progress across devices;
- complete free or sample challenges;
- create private artifact drafts;
- manage newsletter preferences;
- claim Founding Learner access while available.

### Calendar Learning Pass

Founding offer:

- free for the first 1,000 verified users who explicitly claim it.

After the founding allocation:

- ₹199 one-time;
- lifetime access;
- not a subscription.

The pass is intended to unlock:

- complete syllabus calendar export;
- deep links in every calendar event;
- guided daily workspaces;
- full challenge paths;
- progress, streaks, and skills;
- live portfolio publishing;
- leaderboards;
- peer review;
- unlimited calendar re-exports.

Newsletter signup does not consume a founding place.

## 7. Growth paths

The public product starts with four clear paths:

1. **Product Craft** — discovery, UX, prioritisation, metrics, execution, and strategy.
2. **Technical PM** — APIs, databases, systems, payments, reliability, and architecture.
3. **AI Product PM** — LLMs, RAG, agents, AI UX, evaluation, safety, and AI product strategy.
4. **Portfolio Builder** — realistic company and domain challenges that produce interview-ready evidence.

Each path must communicate:

- the transformation;
- the skills practised;
- the artifacts created;
- a preview of the first week;
- the next action.

Do not expose all spreadsheet rows on the landing page.

## 8. Core journeys

### A. Discover and choose a path

`Landing page → Understand the outcome → View artifacts → Choose a path → Preview the first week → Open a sample challenge`

### B. Sign in

`Choose a path or open a gated destination → Enter email → Receive magic link → Confirm session → Return to the original destination`

Requirements:

- preserve the intended return route;
- show a clear link-sent state;
- handle expired links;
- support resend cooldown;
- create the user profile after first verified sign-in;
- keep newsletter consent separate.

### C. Create a learning plan

`Choose path → Select start date → Select learning weekdays → Select time and duration → Preview scheduled days → Confirm → Download one .ics file`

### D. Complete a day

`Open day → See outcome and artifact → Diagnose → Decide → Build → Reflect → Complete → Create artifact draft → Update skills and streak → Offer sharing`

### E. Publish an artifact

`Complete day → Review generated draft → Add evidence → Choose visibility → Preview → Publish → Copy link or share`

### F. Peer review

`Request review → Select focus → Spend review credit → Enter pool → Receive structured feedback → Mark helpful → Revise artifact`

### G. Email return loop

`Receive weekly challenge → Open exact destination → Resume first incomplete problem → Complete work → Return for progress or peer feedback`

## 9. Information architecture

### Public navigation

- Explore
- Challenges
- Community
- How it works
- Sign in

### Signed-in navigation

- Today
- My Path
- Portfolio
- Community
- Profile

### Community sections

- Leaderboard
- Peer Review
- Activity

### Profile sections

- Skills
- Streaks
- Email preferences
- Account settings
- Purchases

### Utility destinations

- Calendar setup
- Data export
- Connector settings
- Help
- Privacy
- Terms
- Community guidelines

Do not introduce a permanent left sidebar.

## 10. Route direction

Current and near-term routes:

- `/`
- `/explore`
- `/paths/[pathSlug]`
- `/paths/[pathSlug]/week/[weekNumber]`
- `/paths/[pathSlug]/day/[dayNumber]`
- `/challenges/sample`
- `/sign-in`
- `/auth/confirm`
- `/today`
- `/my-path`
- `/portfolio`
- `/community`
- `/profile`
- `/calendar`

Future routes:

- `/learn/[planId]/day/[dayNumber]`
- `/learn/[planId]/day/[dayNumber]/problem/[problemNumber]`
- `/portfolio/artifacts/[artifactId]`
- `/community/leaderboard`
- `/community/reviews`
- `/settings`
- `/@[handle]`
- `/@[handle]/[artifactSlug]`
- `/admin/...`

Deep links must restore the original destination after authentication.

## 11. Daily three-problem system

Every published challenge day contains exactly three connected problems:

1. Diagnose
2. Decide
3. Build

The three problems must contribute to one final artifact.

### Initial day screen

Show only:

- day number;
- title;
- why it matters;
- intended outcome;
- estimated duration;
- final artifact;
- skills practised;
- start or resume action.

### Progressive disclosure

- Only the current problem is expanded.
- Problem 2 unlocks after Problem 1 is saved.
- Problem 3 unlocks after Problem 2 is saved.
- Completed problems remain editable.
- Resume opens the first incomplete problem.

### Completion

A day is complete only when:

- all three problems are completed;
- an artifact draft is assembled;
- the reflection is completed.

Proof is required before public publication, not before private completion.

## 12. Persistence model

### Before sign-in

Use local storage for:

- selected path;
- current day and problem;
- draft responses;
- local completion state;
- reduced-motion and UI preferences.

### After sign-in

Synchronize user-owned data to Supabase:

- profile;
- learning plans;
- plan days;
- problem responses;
- reflections;
- artifacts;
- email preferences;
- entitlements.

### Sync behavior

- Local saves happen immediately.
- Cloud synchronization happens after local save.
- Failed sync must not delete local work.
- Retrying sync must be idempotent.
- The UI must show local, syncing, saved, and sync-failed states clearly.

## 13. Authentication and newsletter

Authentication uses Supabase email magic links.

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Authentication must not imply newsletter consent.

Newsletter preferences are optional and unselected by default:

- weekly PM challenge;
- product, technology, and AI newsletter;
- challenge reminders;
- peer-review notifications;
- monthly progress summary.

## 14. Calendar behavior

Generate one standards-compliant `.ics` file containing one event per scheduled day.

Do not create three calendar events for the three daily problems.

Each event must include:

- day title;
- the three problem titles;
- expected artifact;
- estimated duration;
- deep link to the exact day.

Deep-link example:

`/learn/[opaque-plan-id]/day/[day-number]`

Do not put the following in calendar URLs:

- email address;
- raw user ID;
- access token;
- answers;
- artifact data;
- payment information.

The calendar is an export, not live calendar sync.

## 15. Live portfolio

Every completed challenge creates a private artifact draft.

Visibility states:

- private;
- draft;
- unlisted;
- public.

Nothing becomes public automatically.

A public artifact should read like a concise PM case study:

- challenge;
- why it mattered;
- context and constraints;
- diagnosis;
- decision;
- solution;
- evidence;
- reflection;
- skills demonstrated;
- approved peer feedback.

Do not build a full Notion clone.

## 16. Streaks, points, and leaderboards

A streak counts only for meaningful work:

- completing all three problems, artifact, and reflection;
- or submitting a valid peer review on a scheduled day.

Do not count logins or page views.

Leaderboards must be:

- opt-in;
- weekly;
- reset regularly;
- segmented where useful;
- privacy-aware;
- based on useful contribution.

Use an append-only server-side points ledger.

## 17. Peer review

Use a review-credit model:

- submit one valid review to earn one credit;
- spend one credit to request one review;
- give new users one starter credit.

Feedback must be structured around:

- what is strong;
- what is unclear;
- which assumption should be challenged;
- what would improve the artifact most;
- rubric score.

Written feedback is required before submitting a score.

Moderation requirements:

- report;
- block;
- remove review from public display;
- admin queue;
- rate limits;
- audit trail.

## 18. LinkedIn sharing

Do not use LinkedIn OAuth in the initial product.

Do not claim automatic publishing.

After a meaningful completion, offer:

- editable post draft;
- copy post;
- generate share image;
- download image;
- open LinkedIn;
- not now.

Private notes, email addresses, local file paths, internal IDs, and non-public links must never be included by default.

Reflection excerpts and proof links are opt-in.

## 19. Design system

Use shadcn/ui as accessible interaction primitives, not as the final visual identity.

Brand direction:

- pine masthead and actions;
- paper background;
- white document surfaces;
- restrained mint;
- amber scheduling and emphasis;
- green completion states;
- red blocked states;
- editorial headings;
- readable UI typography;
- monospace metadata;
- fine borders;
- restrained shadows;
- document and field-notebook composition.

Inspiration:

- The Product Folks for community energy and visual discovery;
- HelloPM for transformation-led messaging and portfolio outcomes.

Do not copy either site’s layouts, wording, branding, navigation, imagery, testimonials, or visual identity.

Avoid:

- default dashboard templates;
- stock-photo dependence;
- glassmorphism everywhere;
- decorative 3D objects;
- neon gradients;
- fake testimonials;
- generic course-thumbnail grids;
- decorative charts without product meaning;
- information-dense screens with multiple competing CTAs.

## 20. Frontend architecture

Use:

- Next.js App Router;
- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui open-code components;
- Zod;
- React Hook Form where forms justify it;
- TanStack Query only where client-side server-state caching materially helps;
- Motion only where it explains progression.

Performance rules:

- prefer Server Components for public and read-heavy pages;
- hydrate only interactive workspaces;
- statically render path and marketing content where practical;
- lazy-load heavy editors, spreadsheet processing, and image generation;
- avoid unnecessary global state;
- avoid unnecessary animation libraries;
- use stable IDs;
- do not use array indexes as persistent IDs;
- keep public paths usable without Supabase queries when curated static content is available.

## 21. Backend architecture

Supabase owns:

- passwordless authentication;
- Postgres data;
- Row Level Security;
- private and public storage;
- Realtime where useful;
- Edge Functions;
- Cron.

Server-only operations include:

- founding-pass claims;
- Razorpay order creation;
- payment signature verification;
- webhook handling;
- entitlement grants;
- protected calendar export;
- public asset promotion;
- scheduled email;
- leaderboard computation;
- moderation actions.

## 22. Security and privacy

Enable RLS on every exposed user-data table.

Rules:

- users manage only their own profile, plans, progress, responses, private artifacts, and preferences;
- public visitors read only published records;
- payment and entitlement tables are never client-writable;
- leaderboards include only opted-in users;
- private uploads remain in private buckets;
- public publication is explicit;
- webhooks require signature verification;
- server mutations use validation and idempotency;
- public handles and uploaded files are validated;
- rendered user content is sanitized.

## 23. Content production

The spreadsheet is a source, not a ready-to-publish UI.

For every published challenge day:

1. normalize the source row;
2. define one outcome;
3. write exactly three connected problems;
4. add prompts, constraints, expected outputs, hints, and rubric;
5. define one final artifact;
6. map skills;
7. add a visual cover;
8. review editorial quality;
9. publish.

Do not silently discard spreadsheet rows. Preserve all source content in the import model even when it is not immediately published.

Recommended flagship content remains the 50-day AI Product and PM Fluency path, followed by Technical PM, Product Craft, and Portfolio Builder.

## 24. Release 2 scope

The current implementation branch is `release-2-core-journey`.

This release must deliver the smallest complete core product loop:

- working magic-link sign-in;
- authentication callback;
- return-route preservation;
- path detail pages;
- week and day navigation;
- three-problem daily workspace;
- progressive unlocking;
- local autosave;
- Supabase synchronization for signed-in users;
- resume from first incomplete problem;
- artifact finish line visible throughout;
- functional mobile navigation;
- production build passing on Vercel.

This release does not yet need to complete:

- Razorpay payment;
- Founding 1,000 transaction;
- full calendar generation;
- public portfolio publishing;
- leaderboards;
- peer review;
- newsletters;
- admin studio;
- AI feedback.

The code should prepare clean integration boundaries for those later modules.

## 25. Release 2 acceptance criteria

### Authentication

- User can request a magic link.
- Link-sent state is clear.
- Callback establishes a session.
- User returns to the intended route.
- Errors are understandable.
- Newsletter consent is not bundled into sign-in.

### Path journey

- Every path card opens a real path page.
- The path page shows outcome, skills, artifact types, weeks, and progress.
- A user can open a week and a specific day.
- Direct route refresh works.

### Daily challenge

- Exactly three ordered problems are shown.
- Only the current problem is expanded.
- Save and continue unlocks the next problem.
- Earlier responses remain editable.
- Responses persist after refresh.
- Signed-in responses sync to Supabase.
- A failed cloud sync does not erase local work.
- Resume opens the first incomplete problem.

### UX

- One primary action per screen.
- Mobile navigation works.
- Keyboard interaction works.
- Focus states are visible.
- Reduced motion is respected.
- No empty tab or dead CTA remains.

### Engineering quality

- TypeScript passes.
- ESLint passes or has documented non-blocking warnings.
- Production build passes.
- Supabase Deno functions remain excluded from the Next.js typecheck.
- No secrets are committed.
- Environment variables are documented.

## 26. Quality gates for all future work

Before merging any product release:

- verify the product still does not feel like an LMS;
- test direct-route refresh;
- test mobile and keyboard navigation;
- test local persistence;
- test signed-in synchronization;
- test privacy boundaries;
- test reduced motion;
- run typecheck;
- run lint;
- run production build;
- verify Vercel preview deployment;
- document known limitations.

## 27. Decision rule for future AI-assisted implementation

When a request is ambiguous:

1. preserve this file’s principles;
2. prefer the simplest end-to-end user journey;
3. do not invent access, payments, content, testimonials, usage numbers, or backend behavior;
4. do not silently reactivate superseded static-only constraints;
5. keep the base interaction useful before adding monetization or community complexity;
6. make private-by-default the safer choice;
7. ask for a product-owner decision only when the ambiguity materially changes scope, privacy, money, or data ownership.
