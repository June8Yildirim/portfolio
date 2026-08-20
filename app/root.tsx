import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

// import gsap from "gsap";
// gsap.registerPlugin(ScrollTrigger, SplitText);

export const links: Route.LinksFunction = () => [
  // Favicons — BASE_URL-prefixed so they resolve under the GitHub Pages subpath too.
  // ?v=2 busts the browser's aggressive favicon cache after the icon changed.
  {
    rel: "icon",
    type: "image/svg+xml",
    href: `${import.meta.env.BASE_URL}favicon.svg?v=2`,
  },
  {
    rel: "icon",
    href: `${import.meta.env.BASE_URL}favicon.ico?v=2`,
    sizes: "any",
  },
  {
    rel: "apple-touch-icon",
    href: `${import.meta.env.BASE_URL}apple-touch-icon.png?v=2`,
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const base = import.meta.env.BASE_URL;
  return (
    <html
      lang="en"
      style={
        {
          // Public images referenced from CSS, prefixed with the deploy base URL.
          "--asset-dev-avatar": `url("${base}images/dev_avatar.jpg")`,
          "--asset-noisy-bg": `url("${base}images/avatar_dev.png")`,
        } as React.CSSProperties
      }
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="portal-id" />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
