import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import "./styles/main.scss";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "./components/App/ErrorFallBack";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallBack}
      onReset={() => window.location.replace("/")}
    >
      <Provider store={store}>
        <Router>
          <App />
          <Toaster
            position="top-center"
            gutter={12}
            toastOptions={{
              error: { duration: 3000 },
            }}
          />
        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
