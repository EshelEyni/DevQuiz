import { AppHeader } from "./components/App/AppHeader/AppHeader";
import { routes } from "./routes";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "./store/types";
import { AppFooter } from "./components/App/AppFooter/AppFooter";
import { loginWithToken } from "./store/slices/authSlice";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  return (
    <div className="app">
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
