# PM Daily — Canonical User Journey

This document defines the intended end-to-end product journey for PM Daily. It is the reference for product, design, frontend, backend, analytics, payment, calendar export, and future content-system decisions.

## Product promise

PM Daily helps product managers build practical skill through a scheduled daily learning journey.

The highest-value promise is:

> Choose when you want to learn, receive a structured PM syllabus, add the full journey to your calendar, and complete one practical challenge at a time.

PM Daily is not a traditional LMS. It is a calendar-led practice system with daily challenges, artifacts, uploads, progress, and portfolio evidence.

---

## Primary journey

```text
Visitor lands on PM Daily
→ understands the value
→ chooses a start date
→ chooses learning days of the week
→ enters email
→ verifies email
→ chooses a PM path
→ sees the complete journey and daily goals
→ can explore the first challenge
→ clicks “Add the full journey to my calendar”
→ Razorpay checkout opens
→ payment succeeds
→ entitlement is granted
→ one complete .ics file downloads
→ user imports the file into Google, Apple, Outlook, or another calendar
→ every event deep-links to the correct PM Daily day
→ user completes daily challenges, uploads evidence, creates artifacts, and tracks progress
```

---

## Journey principles

1. Calendar value is introduced immediately, not hidden after onboarding.
2. The landing page asks for learning intent before asking for account details.
3. One user decision per step.
4. The user must understand what they will receive before payment.
5. Payment unlocks the complete calendar syllabus, not the ability to browse PM Daily.
6. One `.ics` file must contain the entire selected syllabus.
7. One learning day equals one calendar event.
8. Every calendar event opens the exact PM Daily day.
9. The daily experience contains three connected problems: Diagnose, Decide, and Build.
10. Content must be versioned and editable without breaking existing users or previously generated calendars.
11. Nothing becomes public automatically.
12. Authentication, newsletter consent, payment entitlement, and portfolio visibility are separate states.

---

# Stage 1 — Landing page

## User goal

Understand PM Daily quickly and decide whether the calendar-led learning system is useful.

## Page structure

### Hero

Core message:

> Build stronger PM judgment through practical daily challenges scheduled around your week.

Primary CTA:

```text
Build my learning calendar
```

Secondary CTA:

```text
Preview the syllabus
```

### Value explanation

The visitor should understand:

- practical PM challenges rather than passive lessons,
- one focused learning event per selected day,
- three connected problems per challenge,
- one artifact created each day,
- a full syllabus that can be added to their calendar,
- progress, uploads, and portfolio evidence inside PM Daily.

### Calendar setup on the landing page

The landing page asks:

```text
When do you want to start?
```

Fields:

- Start date
- Preferred learning days
- Preferred learning time
- Timezone, detected automatically but editable

Default learning days:

```text
Monday
Tuesday
Wednesday
Thursday
Friday
```

The page should preview the resulting schedule before account creation.

Example:

```text
Your first week
Mon 22 Jun — Find the real onboarding problem
Tue 23 Jun — Choose a target user and job
Wed 24 Jun — Prioritise the first intervention
Thu 25 Jun — Design an activation experiment
Fri 26 Jun — Write a focused PRD
```

The schedule selection is saved temporarily in a secure cookie or local storage until the account is verified.

## Landing-page success state

The visitor clicks:

```text
Continue and save my plan
```

This opens the email step.

---

# Stage 2 — Email and verification

## User goal

Create a lightweight account and preserve the schedule they configured.

## Email step

The user enters an email address.

Primary CTA:

```text
Email me a secure link
```

The account uses Supabase passwordless authentication.

The system must preserve:

- start date,
- selected weekdays,
- preferred time,
- timezone,
- intended next step,
- campaign/referral information where present.

## Verification flow

```text
Enter email
→ receive verification or magic-link email
→ click link
→ Supabase verifies the user
→ PM Daily restores the pending plan
→ continue to path selection
```

The verified user should never land on a generic account page during onboarding.

Expected redirect:

```text
/onboarding/path
```

Fallback behavior:

- Invalid link → return to sign-in with a clear explanation.
- Expired link → allow the user to request another email.
- Existing user → restore their pending setup or send them to Today.

Newsletter consent must not be preselected and must remain separate from account creation.

---

# Stage 3 — Path selection

## User goal

Choose the learning outcome that best matches their current PM goal.

Initial paths:

1. Product Craft
2. Technical PM
3. AI Product PM
4. Portfolio Builder

Each path card shows:

- who it is for,
- the outcome,
- skills practiced,
- sample artifacts,
- duration,
- number of learning days,
- two-week preview,
- estimated time per session.

Primary CTA:

```text
Choose this path
```

Secondary action:

```text
View full syllabus
```

When selected, PM Daily creates or updates:

- the profile’s selected path,
- a learning plan,
- the pinned curriculum version,
- scheduled plan days based on the user’s selected weekdays.

The learner remains pinned to that curriculum version so future content edits do not silently alter an active plan.

---

# Stage 4 — Journey overview

## User goal

Understand the full learning journey and know exactly what to do next.

## Main product navigation

```text
Today
Week
Full path
Artifacts
Progress
```

## Journey overview content

The page shows:

- chosen path,
- start date,
- learning days,
- current week,
- next learning day,
- total days,
- completed days,
- artifacts that will be created,
- skills being practiced.

## Daily-goal structure

```text
Path
├── Week 1
│   ├── Day 1
│   ├── Day 2
│   ├── Day 3
│   ├── Day 4
│   └── Day 5
├── Week 2
│   ├── Day 6
│   ├── Day 7
│   ├── Day 8
│   ├── Day 9
│   └── Day 10
└── Final path outcome
```

Each day card shows:

- day number,
- challenge title,
- outcome,
- artifact,
- duration,
- scheduled date,
- status.

Statuses:

```text
Not started
In progress
Completed
Skipped
```

## Calendar CTA

A persistent but non-obstructive side button appears throughout the journey:

```text
Add the full journey to my calendar
```

Supporting text:

```text
Get every learning day, outcome, and direct challenge link in one calendar file.
```

This is the main paid conversion point.

---

# Stage 5 — Payment and calendar unlock

## User goal

Unlock and download the complete calendar learning pass.

## Before checkout

A confirmation sheet or page shows:

- selected path,
- curriculum version,
- number of events,
- first and last scheduled date,
- selected weekdays,
- preferred time,
- timezone,
- one-time price,
- lifetime access terms,
- supported calendar applications.

The user can edit the schedule before payment.

## Razorpay checkout

Primary CTA:

```text
Unlock my calendar journey
```

Checkout flow:

```text
Create server-side Razorpay order
→ open Razorpay checkout
→ user completes payment
→ server verifies payment signature
→ payment record is stored
→ entitlement is granted
→ calendar download becomes available
```

Never grant access from a client-side success event alone.

## Founding access

The product may support:

- first 1,000 verified users receiving explicit free access,
- later users paying ₹199 once,
- lifetime calendar learning-pass entitlement.

Founding access must be claimed atomically on the server and must not be consumed by newsletter-only signups.

## Payment states

```text
Not started
Order created
Payment processing
Payment succeeded
Verification failed
Payment failed
Refunded
```

A verified successful payment creates an active entitlement.

---

# Stage 6 — ICS generation and download

## User goal

Add the entire selected syllabus to their calendar in one action.

## Calendar-file requirement

The downloaded file must be one valid `.ics` file containing all events in the selected curriculum.

Example:

```text
pm-daily-product-craft-v1.ics
```

## Event rules

One challenge day equals one event.

Each event contains:

### Title

```text
PM Daily — Day 4: Design an activation experiment
```

### Date and time

Generated from:

- selected start date,
- selected weekdays,
- preferred start time,
- session duration,
- timezone.

### Description

```text
PATH: Product Craft
WEEK: 1
DAY: 4 of 10

OUTCOME
Define a testable activation experiment with clear metrics and decision rules.

TODAY'S PROBLEMS
1. Diagnose
2. Decide
3. Build

ARTIFACT
Activation experiment plan

ESTIMATED TIME
60 minutes

OPEN TODAY'S CHALLENGE
https://pm-daily-mu.vercel.app/learn/<opaque-plan-day-token>
```

### Stable UID

Each event receives a stable UID based on the plan day, not only the title or date.

Example pattern:

```text
<plan-day-id>@pm-daily
```

### Deep link

The event link opens the exact scheduled plan day.

Calendar URLs must not expose:

- email addresses,
- user IDs,
- payment data,
- authentication tokens,
- private responses.

Use an opaque public token or plan-day token.

## Calendar compatibility

The file should work with:

- Google Calendar
- Apple Calendar
- Microsoft Outlook
- other standards-compliant calendar applications

## Download screen

After payment:

```text
Your PM Daily calendar is ready
```

Actions:

```text
Download calendar file
How to import it
Open my first challenge
```

The user can regenerate the calendar later from the account without paying again.

Regeneration should preserve event UIDs where the plan is unchanged, reducing duplicate calendar entries.

---

# Stage 7 — Today experience

## User goal

Complete one practical learning challenge without information overload.

## Today page

The page answers:

- What am I doing today?
- Why does it matter?
- What will I create?
- How long will it take?
- What is my next action?

## Daily challenge sequence

```text
Day introduction
→ Diagnose
→ Decide
→ Build
→ Reflection
→ Artifact
→ Complete day
```

Only one active problem should be prominent at a time.

### Problem 1 — Diagnose

The learner identifies:

- evidence,
- assumptions,
- affected users,
- root causes,
- unknowns.

### Problem 2 — Decide

The learner compares options and records:

- decision criteria,
- selected direction,
- rejected alternatives,
- trade-offs,
- risks.

### Problem 3 — Build

The learner creates the day’s artifact.

Examples:

- one-page PRD,
- experiment plan,
- architecture memo,
- API specification,
- AI evaluation rubric,
- portfolio case-study section.

## Completion

A day becomes complete when:

- three responses are saved,
- a reflection is completed,
- an artifact draft exists.

Anonymous sample users may save locally. Signed-in users save to Supabase.

---

# Stage 8 — Uploads and artifacts

## User goal

Attach evidence and turn daily work into reusable portfolio material.

The learner can upload or link:

- images,
- PDFs,
- documents,
- spreadsheets,
- diagrams,
- prototypes,
- external links.

All uploads are private by default.

Artifact visibility:

```text
Private
Draft
Unlisted
Public
```

Nothing becomes public without explicit user action.

After completing a day, show:

```text
Share progress on LinkedIn
```

This should create editable share text and must not publish automatically.

---

# Stage 9 — Week and progress views

## Week view

Shows:

- this week’s goal,
- scheduled learning days,
- completion status,
- artifacts created,
- upcoming event,
- option to reschedule inside PM Daily.

Changing a PM Daily schedule does not automatically edit imported calendar events in the first version. The app should clearly offer a regenerated `.ics` file.

## Progress view

Shows evidence-backed progress:

- completed challenges,
- artifacts created,
- skills practiced,
- streaks later,
- reflections,
- portfolio readiness.

Avoid arbitrary skill percentages without evidence.

---

# Content architecture

The syllabus must remain editable and versioned.

```text
Learning Path
→ Curriculum Version
→ Module / Week
→ Topic
→ Challenge Day
→ Diagnose problem
→ Decide problem
→ Build problem
→ Resources
→ Artifact definition
→ Rubric
→ Sources
```

## Versioning rule

```text
Product Craft
├── Version 1 — published
├── Version 2 — draft
└── Version 3 — archived
```

- Active plans remain pinned to the version selected at enrollment.
- New users receive the current published version.
- Draft versions can be edited freely.
- Publishing a new version must not modify old calendar events or completed work.

## Content improvement workflow

```text
Source material
→ problem candidate
→ editorial draft
→ skill and topic mapping
→ Diagnose / Decide / Build design
→ artifact and rubric definition
→ review
→ publish into a curriculum version
```

Potential sources:

- original PM Daily scenarios,
- public product cases,
- launches,
- technical incidents,
- research,
- anonymized PM situations,
- AI product patterns.

No sourced problem should publish automatically. Editorial review and attribution are required where applicable.

---

# Core data state

The user journey relies on these independent states:

## Identity

```text
Anonymous
Email submitted
Verified
Authenticated
```

## Onboarding

```text
Schedule selected
Email verified
Path selected
Learning plan created
Onboarding complete
```

## Commerce

```text
No entitlement
Founding entitlement
Paid entitlement
Revoked or refunded
```

## Learning

```text
Not started
In progress
Completed
Skipped
```

## Artifact

```text
Private
Draft
Unlisted
Public
```

These states must not be inferred from one another.

---

# Required routes

```text
/
/onboarding/email
/onboarding/path
/onboarding/plan
/journey
/today
/week
/path/[pathSlug]
/path/[pathSlug]/week/[weekNumber]
/learn/[planDayToken]
/artifacts
/progress
/calendar/checkout
/calendar/success
/api/calendar/download
/api/payments/razorpay/order
/api/payments/razorpay/verify
/api/payments/razorpay/webhook
/auth/callback
/auth/confirm
```

---

# Analytics funnel

Track the following events without storing private learning content in analytics:

```text
landing_viewed
calendar_setup_started
start_date_selected
weekdays_selected
email_submitted
email_verified
path_viewed
path_selected
journey_viewed
calendar_cta_clicked
checkout_started
payment_succeeded
payment_failed
ics_downloaded
challenge_opened
problem_completed
day_completed
artifact_created
upload_added
linkedin_share_opened
```

Primary funnel:

```text
Landing visitor
→ schedule configured
→ verified user
→ path selected
→ calendar CTA
→ paid or founding entitlement
→ ICS downloaded
→ first challenge opened
→ first day completed
```

---

# Release order

## Release A — Data and syllabus

- Supabase foundation tables
- Curriculum versions
- Modules and topics
- Published challenge days
- Three problems per day
- Skill mappings
- Public curriculum reads

## Release B — Calendar-first onboarding

- Landing-page date and weekday selector
- Temporary pending-plan storage
- Email verification return flow
- Path selection
- Learning-plan creation
- Journey overview

## Release C — Razorpay and calendar pass

- Checkout
- Server-side payment verification
- Entitlements
- One complete `.ics` file
- Deep links per event
- Download and import guidance

## Release D — Daily learning workspace

- Today and Week views
- Diagnose / Decide / Build
- Autosave
- Completion state
- Artifacts and uploads

## Release E — Portfolio and community

- Public artifact publishing
- LinkedIn sharing
- Peer review
- Streaks
- Leaderboards

---

# Current product direction

The immediate product priority is:

```text
1. Show calendar value on the landing page
2. Capture schedule intent
3. Verify the user
4. Help them choose a path
5. Show the complete journey
6. Convert through the calendar-pass CTA
7. Verify payment
8. Download one full-syllabus .ics file
9. Deep-link every event to a daily challenge
10. Build uploads, artifacts, and progress around that daily loop
```

This journey supersedes any earlier flow that sends verified users to a generic account page before path and plan setup.
