import Header from "./components/Header";
import { routes } from "./routes";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </div>
  );
};
