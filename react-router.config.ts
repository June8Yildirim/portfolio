import type { Config } from "@react-router/dev/config";

const isGHPages = process.env.GITHUB_PAGES === "true";

export default {
  ssr: false,
  ...(isGHPages && { basename: "/portfolio/" }),
} satisfies Config;
