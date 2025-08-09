import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/echo-chamber", "routes/echo-chamber.tsx"),
  route("/twilight-plaza", "routes/twilight-plaza.tsx"),
] satisfies RouteConfig;
