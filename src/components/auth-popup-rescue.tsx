import { useEffect } from "react";
import { authClient } from "@/lib/auth/client";
import { readAuthPopupToken } from "@/lib/server/popup-token";

const POPUP_RESULT_KEY = "grok-auth.popup-result";

type PopupMessage = {
  source: "grok-auth-popup";
  token: string | null;
  error?: string;
};

export function isAuthPopupPath(pathname: string): boolean {
  return (
    pathname === "/auth/popup" ||
    pathname === "/api/oauth-popup" ||
    pathname.endsWith("/auth/popup") ||
    pathname.endsWith("/api/oauth-popup")
  );
}

export function AuthPopupRescue() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const done = url.searchParams.get("done") === "1";
    const providerId = url.searchParams.get("providerId")?.trim();
    const errored = url.searchParams.has("error");

    const finish = (token: string | null, error?: string) => {
      const msg: PopupMessage = {
        source: "grok-auth-popup",
        token,
        ...(error ? { error } : {}),
      };
      try {
        window.localStorage.setItem(POPUP_RESULT_KEY, JSON.stringify(msg));
      } catch {
        /* storage blocked */
      }
      try {
        if (window.opener) window.opener.postMessage(msg, window.location.origin);
      } catch {
        /* opener gone */
      }
      try {
        window.close();
      } catch {
        /* ignore */
      }
    };

    if (done) {
      if (errored) {
        finish(null, url.searchParams.get("error") ?? "sign_in_failed");
        return;
      }
      void readAuthPopupToken()
        .then((token) => finish(token))
        .catch(() => finish(null, "token_read_failed"));
      return;
    }

    if (!providerId) {
      finish(null, "missing_provider");
      return;
    }

    const back = `${url.origin}${url.pathname}?done=1`;
    void authClient.signIn
      .oauth2({
        providerId,
        callbackURL: back,
        errorCallbackURL: `${back}&error=1`,
      })
      .then(({ data, error }) => {
        if (error || !data?.url) {
          finish(null, error?.message ?? "oauth_init_failed");
          return;
        }
        window.location.href = data.url;
      })
      .catch((err: unknown) => {
        finish(null, err instanceof Error ? err.message : "oauth_init_threw");
      });
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0b0c] px-6 text-center text-sm text-zinc-400">
      <p>Signing you in…</p>
    </main>
  );
}
