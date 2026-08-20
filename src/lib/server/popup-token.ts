import { createServerFn } from "@tanstack/react-start";

/** Read the first-party session cookie so the OAuth popup can hand it back. */
export const readAuthPopupToken = createServerFn({ method: "GET" }).handler(async () => {
  const { readSessionToken } = await import("@/lib/auth/server");
  return readSessionToken();
});
