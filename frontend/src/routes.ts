import { QuestionEdit } from "./pages/QuestionEdit/QuestionEdit";
import { About } from "./pages/About/About";
import { QuestionManagementPage } from "./pages/QuestionManagement/QuestionManagementPage";
import { Homepage } from "./pages/Home/Homepage";
import { ProfileDetails } from "./pages/ProfileDetails/ProfileDetails";
import { UserManagementPage } from "./pages/UserManagement/UserManagementPage";
import { QuizSetting } from "./pages/QuizSetting/QuizSetting";
import { AuthPage } from "./pages/Auth/AuthPage";

interface Route {
  path: string;
  component: () => JSX.Element;
  nestedRoutes?: Route[];
}

const routes: Route[] = [
  {
    path: "/home",
    component: Homepage,
    nestedRoutes: [
      {
        path: "question-edit/:id?",
        component: QuestionEdit,
      },
      {
        path: "auth",
        component: AuthPage,
      },
      {
        path: "settings",
        component: QuizSetting,
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
    path: "/about",
    component: About,
  },
];

export { routes };
