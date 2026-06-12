import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const authHeader = request.headers.get("Authorization") ?? "";
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { global: { headers: { Authorization: authHeader } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Authentication required" }, { status: 401 });
  // Production implementation should call a SECURITY DEFINER Postgres function that locks founding_counter,
  // checks claimed_count < 1000, inserts entitlement, increments the counter, and returns founding_number atomically.
  return Response.json({ ok: false, code: "NOT_CONFIGURED", message: "Connect the atomic claim_founder_pass() database function before launch." }, { status: 501 });
});
