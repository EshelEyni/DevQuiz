import { QuestionEdit } from "./pages/QuestionEdit/QuestionEdit";
import { About } from "./pages/About/About";
import { QuestionManagementPage } from "./pages/QuestionManagement/QuestionManagementPage";
import { Homepage } from "./pages/Home/Homepage";
import { ProfileDetails } from "./pages/ProfileDetails/ProfileDetails";
import { UserManagementPage } from "./pages/UserManagement/UserManagementPage";
import { ContactManagementPage } from "./pages/ContactManagement/ContactManagementPage";

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
    path: "/question-management",
    component: QuestionManagementPage,
    nestedRoutes: [
      {
        path: "question-edit/:id?",
        component: QuestionEdit,
      },
    ],
  },
  {
    path: "/user-management",
    component: UserManagementPage,
  },
  {
    path: "/contact-management",
    component: ContactManagementPage,
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
