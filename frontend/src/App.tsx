import { AppHeader } from "./components/App/AppHeader";
import { routes } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppFooter } from "./components/App/AppFooter";
import { loginWithToken } from "./store/slices/authSlice";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { AppDispatch } from "./types/app.types";

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-700 text-gray-50">
      <AppHeader />
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
      <AppFooter />
    </div>
  );
};
