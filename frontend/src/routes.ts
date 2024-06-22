import { FC, LazyExoticComponent, lazy } from "react";
const JobApplicationEdit = lazy(
  () => import("./pages/JobApplicationEdit/JobApplicationEdit"),
);
const JobApplication = lazy(
  () => import("./pages/JobApplication/JobApplication"),
);
const QuestionEdit = lazy(() => import("./pages/QuestionEdit/QuestionEdit"));
const About = lazy(() => import("./pages/About/About"));
const QuestionManagementPage = lazy(
  () => import("./pages/QuestionManagement/QuestionManagementPage"),
);
const Homepage = lazy(() => import("./pages/Home/Homepage"));
const ProfileDetails = lazy(
  () => import("./pages/ProfileDetails/ProfileDetails"),
);
const QuizSetting = lazy(() => import("./pages/QuizSetting/QuizSetting"));
const AuthPage = lazy(() => import("./pages/Auth/AuthPage"));

interface Route {
  path: string;
  component: LazyExoticComponent<FC>;
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
    path: "/job-applications",
    component: JobApplication,
    nestedRoutes: [
      {
        path: "edit/:id?",
        component: JobApplicationEdit,
      },
    ],
  },
  {
    path: "/about",
    component: About,
    nestedRoutes: [
      {
        path: "auth",
        component: AuthPage,
      },
    ],
  },
];

export { routes };
