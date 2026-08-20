import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
// @ts-expect-error JS plugin alongside the TS vite config
import { grokPwaPlugin } from "./scripts/grok-pwa-plugin.mjs";

function pgliteBootstrapPlugin(): Plugin {
  return {
    name: "app-builder:pglite-bootstrap",
    apply: "serve",
    async configureServer(server) {
      try {
        const mod = (await server.ssrLoadModule("/src/lib/db.ts")) as {
          ensureDbReady?: () => Promise<void>;
        };
        if (typeof mod.ensureDbReady === "function") {
          await mod.ensureDbReady();
        }
      } catch (err) {
        console.error("[app-builder] DB bootstrap failed:", err);
        throw err;
      }
    },
  };
}

function isAuthPopupPath(pathOnly: string): boolean {
  return (
    pathOnly === "/auth/popup" ||
    pathOnly === "/api/oauth-popup" ||
    pathOnly.endsWith("/auth/popup") ||
    pathOnly.endsWith("/api/oauth-popup")
  );
}

function authPopupPlugin(): Plugin {
  return {
    name: "app-builder:auth-popup",
    apply: "serve",
    configureServer(server) {
      const handler = async (
        req: { url?: string; method?: string; headers: Record<string, string | string[] | undefined>; socket?: { encrypted?: boolean } },
        res: {
          statusCode: number;
          headersSent: boolean;
          setHeader: (k: string, v: string) => void;
          appendHeader: (k: string, v: string) => void;
          end: (body?: unknown) => void;
        },
        next: () => void,
      ) => {
        try {
          const rawUrl = req.url ?? "";
          const pathOnly = (() => {
            try {
              return new URL(rawUrl, "http://local.invalid").pathname;
            } catch {
              return rawUrl.split("?", 1)[0] ?? "";
            }
          })();
          if (!isAuthPopupPath(pathOnly)) {
            next();
            return;
          }
          if (!["GET", "HEAD"].includes((req.method ?? "GET").toUpperCase())) {
            res.statusCode = 405;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("Method Not Allowed");
            return;
          }

          const host = String(
            req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost:8080",
          );
          const proto = String(
            req.headers["x-forwarded-proto"] ??
              (req.socket?.encrypted ? "https" : "http"),
          );
          const requestHeaders = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const v of value) requestHeaders.append(key, v);
            } else {
              requestHeaders.set(key, value);
            }
          }
          if (!requestHeaders.has("host")) requestHeaders.set("host", host);

          const request = new Request(`${proto}://${host}${rawUrl}`, {
            method: "GET",
            headers: requestHeaders,
          });

          const mod = (await server.ssrLoadModule("/src/lib/auth/popup.server.ts")) as {
            handleAuthPopupRequest: (req: Request) => Promise<Response>;
          };
          const response = await mod.handleAuthPopupRequest(request);

          res.statusCode = response.status;
          const setCookies =
            typeof response.headers.getSetCookie === "function"
              ? response.headers.getSetCookie()
              : [];
          response.headers.forEach((value, key) => {
            if (key.toLowerCase() === "set-cookie") return;
            res.setHeader(key, value);
          });
          for (const cookie of setCookies) {
            res.appendHeader("set-cookie", cookie);
          }
          const body = Buffer.from(await response.arrayBuffer());
          res.end(body);
        } catch (err) {
          console.error("[app-builder] /auth/popup handler failed:", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("auth popup failed");
          }
        }
      };

      server.middlewares.use(handler);
      return () => {
        const stack = server.middlewares.stack as Array<{ handle: unknown }>;
        const idx = stack.findIndex((layer) => layer.handle === handler);
        if (idx > 0) {
          const [layer] = stack.splice(idx, 1);
          stack.unshift(layer);
        }
      };
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
    allowedHosts: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    pgliteBootstrapPlugin(),
    authPopupPlugin(),
    grokPwaPlugin(),
    tailwindcss(),
    tanstackStart(),
    ...(command === "build" || isPreview
      ? [
          nitro({
            preset: "vercel",
            serverDir: "./server",
          }),
        ]
      : []),
    viteReact(),
  ],
}));
