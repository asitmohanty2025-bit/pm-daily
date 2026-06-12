Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  // Integration contract:
  // 1. Authenticate user.
  // 2. Confirm no active calendar_learning_pass.
  // 3. Create a Razorpay order for INR 19900 paise with a stable receipt/idempotency key.
  // 4. Persist provider_order_id as pending.
  // 5. Return only public checkout fields.
  return Response.json({ ok: false, code: "NOT_CONFIGURED", message: "Add Razorpay secrets and order persistence before enabling checkout." }, { status: 501 });
});
