import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Toaster } from "sonner";
import { AuthPopupRescue, isAuthPopupPath } from "@/components/auth-popup-rescue";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AuthProvider } from "@/lib/auth/provider";
import appCss from "../styles.css?url";

const APP_NAME = "Latter Codex";

const fetchSessionUser = createServerFn({ method: "GET" }).handler(async () => {
  const { getSessionUser } = await import("@/lib/auth/verify.server");
  const u = await getSessionUser();
  return u ? { id: u.id, email: u.email } : null;
});

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    if (isAuthPopupPath(location.pathname)) {
      return { sessionUser: null };
    }
    return { sessionUser: await fetchSessionUser() };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "Create and keep Worlds Without Number heroes and campaign backdrops.",
      },
      { name: "theme-color", content: "#0c0b09" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const popup = isAuthPopupPath(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {popup ? (
          <AuthPopupRescue />
        ) : (
          <>
            <PreviewHostBridge />
            <AuthProvider>
              <Outlet />
              <Toaster
                theme="dark"
                position="bottom-right"
                toastOptions={{
                  className: "!bg-surface !text-fg !border-line",
                }}
              />
            </AuthProvider>
          </>
        )}
        <Scripts />
      </body>
    </html>
  );
}
