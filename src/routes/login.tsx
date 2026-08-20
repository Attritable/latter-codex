import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useEffect } from "react";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { consumeReturnPath, peekReturnPath, saveReturnPath, safeReturnPath } from "@/lib/drafts";

type Search = { next?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    next: typeof s.next === "string" ? s.next : undefined,
  }),
  component: Login,
});

function goHomeish(navigate: ReturnType<typeof useNavigate>, raw: string) {
  const dest = safeReturnPath(raw, "/");
  if (dest.startsWith("/worlds/new")) {
    void navigate({ to: "/worlds/new" });
    return;
  }
  if (dest.startsWith("/characters/new")) {
    void navigate({ to: "/characters/new" });
    return;
  }
  const world = /^\/worlds\/([^/?#]+)/.exec(dest);
  if (world?.[1]) {
    void navigate({ to: "/worlds/$id", params: { id: world[1] } });
    return;
  }
  const hero = /^\/characters\/([^/?#]+)/.exec(dest);
  if (hero?.[1]) {
    void navigate({ to: "/characters/$id", params: { id: hero[1] } });
    return;
  }
  void navigate({ to: "/" });
}

function Login() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();

  useEffect(() => {
    if (next) saveReturnPath(next);
  }, [next]);

  useEffect(() => {
    if (isPending || !user) return;
    const dest = consumeReturnPath();
    goHomeish(navigate, dest);
  }, [user, isPending, navigate]);

  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-border bg-surface p-8 shadow-[var(--shadow-border)]">
        <Link to="/" className="mb-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md border border-line text-accent">
            <BookOpen className="size-4" />
          </span>
          <span>
            <span className="block font-display text-2xl text-fg">Latter Codex</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-subtle">Sign in to keep your library</span>
          </span>
        </Link>
        <p className="mb-6 text-sm leading-relaxed text-muted">
          Heroes and worlds are stored per account. Anything you were rolling stays in this tab and is kept after you sign in.
        </p>
        {authEnabled ? (
          <div className="space-y-3">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  saveReturnPath(next ?? peekReturnPath() ?? "/");
                  void signIn(p.providerId, { callbackURL: "/", errorCallbackURL: "/" });
                }}
              >
                Continue with {p.label}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled in this environment.</p>
        )}
        <Link to="/" className="mt-6 inline-block text-sm text-ink hover:text-fg">
          Back to the library
        </Link>
      </div>
    </main>
  );
}
