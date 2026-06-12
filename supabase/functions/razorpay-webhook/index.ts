Deno.serve(async (request) => {
  // Production implementation must read the raw body, verify X-Razorpay-Signature using RAZORPAY_WEBHOOK_SECRET,
  // deduplicate provider event IDs, persist the event, and grant/revoke entitlement in a transaction.
  return Response.json({ ok: false, code: "NOT_CONFIGURED" }, { status: 501 });
});
