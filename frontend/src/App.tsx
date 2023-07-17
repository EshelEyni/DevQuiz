import { Header } from "./components/Header";
import { routes } from "./routes";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "./store/types";
import { autoLogin } from "./store/actions/auth.actions";
import { getSystemSettings } from "./store/actions/system.actions";

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getSystemSettings());
    dispatch(autoLogin());
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />}>
            {route.nestedRoutes?.map((nestedRoute, index) => (
              <Route key={index} path={nestedRoute.path} element={<nestedRoute.component />} />
            ))}
          </Route>
        ))}
      </Routes>
    </div>
  );
};
