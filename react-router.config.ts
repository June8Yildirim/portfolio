import type { Config } from "@react-router/dev/config";

const isGHPages = process.env.GITHUB_PAGES === "true";

export default {
  // GitHub Pages is static hosting and can't run a Node server, so build a
  // client-only SPA there (this emits build/client/index.html). Locally keep SSR.
  ssr: !isGHPages,
  ...(isGHPages && { basename: "/portfolio/" }),
} satisfies Config;
