import { AdminPage } from "./pages/AdminPage";
import { Homepage } from "./pages/Homepage";
import { ProfileDetails } from "./pages/ProfileDetails";

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
  {
    path: "/profile/:id",
    component: ProfileDetails,
  },
  {
    path: "/admin",
    component: AdminPage,
  },
];

export { routes };
