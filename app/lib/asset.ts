// Prefix a public asset path with Vite's base URL so it resolves correctly
// both locally ("/") and on GitHub Pages ("/portfolio/"). Vite does not rewrite
// hardcoded string paths to files in public/, so we do it here.
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
