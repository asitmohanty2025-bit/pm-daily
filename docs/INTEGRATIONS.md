# Integration points

## Supabase

Set the public URL and anon key in Vercel. Apply migrations and seed data. The included clients follow the SSR cookie pattern.

## Resend

Use separate email topics. Authentication email remains Supabase Auth; newsletters and engagement messages are sent through Resend from Edge Functions.

## Razorpay

Secrets remain in Supabase Edge Function secrets. Never create orders or grant entitlements in the browser. Verify both checkout signatures and webhooks.

## Calendar

Generate one `.ics` file per learning plan. Each day is one VEVENT and includes an opaque plan deep link. Calendar export is not live synchronization.

## LinkedIn

The initial integration copies editable text, generates a share image locally, and opens LinkedIn. It does not auto-publish.

## Evidence links

Initial release stores public links to Drive, Notion, Figma, GitHub, Miro, Linear, and Jira. Private OAuth ingestion is deferred.
