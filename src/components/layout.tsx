import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, LogIn } from "lucide-react";
import type { ReactNode } from "react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { saveReturnPath } from "@/lib/drafts";
import { cn } from "@/lib/utils";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  const path = useRouterState({
    select: (s) => s.location.pathname,
  });
  if (isPending) {
    return <div className="h-9 w-28 animate-pulse rounded-md bg-raised" />;
  }
  if (user) return <UserButton />;
  return (
    <Link
      to="/login"
      className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm text-muted hover:bg-raised hover:text-fg"
      onClick={() => {
        if (!path.startsWith("/login")) saveReturnPath(path);
      }}
    >
      <LogIn className="size-4" />
      Sign in
    </Link>
  );
}

export function Shell({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/85 backdrop-blur-md">
        <div className={cn("mx-auto flex h-16 items-center justify-between gap-4 px-4", wide ? "max-w-6xl" : "max-w-5xl")}>
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-md border border-line bg-surface text-accent">
              <BookOpen className="size-4" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl tracking-tight text-fg">Latter Codex</span>
              <span className="mt-0.5 block text-[10px] uppercase tracking-[0.22em] text-subtle">
                Heroes & Worlds
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/characters/new"
              className="hidden h-11 items-center rounded-md px-3 text-sm text-muted hover:text-fg sm:inline-flex"
            >
              New hero
            </Link>
            <Link
              to="/worlds/new"
              className="hidden h-11 items-center rounded-md px-3 text-sm text-muted hover:text-fg sm:inline-flex"
            >
              New world
            </Link>
            <AuthSlot />
          </nav>
        </div>
      </header>
      <main className={cn("mx-auto px-4 py-8", wide ? "max-w-6xl" : "max-w-5xl")}>{children}</main>
      <footer className="border-t border-border px-4 py-8 text-center text-xs text-subtle">
        <SignedOut>Guests may generate freely. Sign in to keep a library.</SignedOut>
        <SignedIn>Your heroes and worlds stay with this account.</SignedIn>
      </footer>
    </div>
  );
}
