import { QuestionEdit } from "./components/admin/QuestionEdit";
import { About } from "./pages/About";
import { AdminPage } from "./pages/AdminPage";
import { Homepage } from "./pages/Homepage";
import { ProfileDetails } from "./pages/ProfileDetails";

interface Route {
  path: string;
  component: () => JSX.Element;
  nestedRoutes?: Route[];
}

const routes: Route[] = [
  {
    path: "",
    component: Homepage,
    nestedRoutes: [
      {
        path: "question-edit/:id?",
        component: QuestionEdit,
      },
    ],
  },
  {
    path: "/profile/:id",
    component: ProfileDetails,
  },
  {
    path: "/admin",
    component: AdminPage,
    nestedRoutes: [
      {
        path: "question-edit/:id?",
        component: QuestionEdit,
      },
    ],
  },
  {
    path: "/about",
    component: About,
  },
];

export { routes };
