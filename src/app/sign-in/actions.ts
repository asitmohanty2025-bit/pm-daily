"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { safeRedirectPath } from "@/lib/auth/redirect";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function getRequestOrigin(requestHeaders: Headers) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");

  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";

  return host ? `${protocol}://${host}` : "http://localhost:3000";
}

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const next = safeRedirectPath(String(formData.get("next") ?? "/account"));
  const nextParam = encodeURIComponent(next);

  if (!email || !email.includes("@")) {
    redirect(`/sign-in?error=email&next=${nextParam}`);
  }

  if (!isSupabaseConfigured()) {
    redirect(`/sign-in?error=config&next=${nextParam}`);
  }

  const requestHeaders = await headers();
  const callbackUrl = new URL("/auth/callback", getRequestOrigin(requestHeaders));
  callbackUrl.searchParams.set("next", next);

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: callbackUrl.toString(),
      shouldCreateUser: true,
    },
  });

  if (error) {
    redirect(`/sign-in?error=send&next=${nextParam}`);
  }

  redirect(`/sign-in?sent=1&next=${nextParam}`);
}
