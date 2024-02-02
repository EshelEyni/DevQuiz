import { AppHeader } from "./components/App/AppHeader";
import { routes } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import { AppFooter } from "./components/App/AppFooter";
import { loginWithToken } from "./store/slices/authSlice";
import { AppDispatch } from "./types/app.types";
import { Loader } from "./components/Loaders/Loader/Loader";
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  return (
    <div className="app flex min-h-screen flex-col items-center overflow-y-scroll bg-gray-700 text-gray-50">
      <AppHeader />
      <Suspense
        fallback={
          <Loader className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" />
        }
      >
        <Routes>
          <Route index element={<Navigate replace to="/home" />} />
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />}>
              {route.nestedRoutes?.map((nestedRoute, index) => (
                <Route
                  key={index}
                  path={nestedRoute.path}
                  element={<nestedRoute.component />}
                />
              ))}
            </Route>
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <AppFooter />
    </div>
  );
};
