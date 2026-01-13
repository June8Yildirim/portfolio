import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Portfolio from "~/components/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuneyt Yildirim" },
    { name: "description", content: "Welcome to Onboard!" },
  ];
}

export default function Home() {
  return <Portfolio />;
}
