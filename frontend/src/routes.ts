import { Homepage } from "./pages/Homepage";

interface Route {
  path: string;
  component: () => JSX.Element;
  onlyHomePage?: boolean;
}

const routes: Route[] = [
  {
    path: "",
    component: Homepage,
  },
];

export { routes };
