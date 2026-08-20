import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/neo.tsx"),
  route("classic", "routes/home.tsx"),
  route("scramble", "routes/scramble.tsx"),
] satisfies RouteConfig;
