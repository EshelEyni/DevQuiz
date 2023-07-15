import Header from "./components/Header";
import { routes } from "./routes";
import { Route, Routes } from "react-router-dom";
import { RootState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleIsContactModalOpen,
  toggleIsLoginSignupModalOpen,
  toggleIsReportQuestionModalOpen,
} from "./store/actions/modal.actions";
import ContactModal from "./components/modals/ContactModal";
import ReportQuestionModal from "./components/modals/ReportQuestionModal";
import Modal from "./components/modals/Modal";
import LoginSignupModal from "./components/modals/LoginSignupModal";
import { useEffect } from "react";
import { AppDispatch } from "./store/types";
import { autoLogin } from "./store/actions/auth.actions";
import { getSystemSettings } from "./store/actions/system.actions";

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isContactOpen, isReportQuestionOpen, isLoginSignupOpen } = useSelector(
    (state: RootState) => state.modalModule
  );

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
      {isContactOpen && (
        <Modal onClickMainScreenFn={toggleIsContactModalOpen}>
          <ContactModal />
        </Modal>
      )}
      {isReportQuestionOpen && (
        <Modal onClickMainScreenFn={toggleIsReportQuestionModalOpen}>
          <ReportQuestionModal />
        </Modal>
      )}

      {isLoginSignupOpen && (
        <Modal onClickMainScreenFn={toggleIsLoginSignupModalOpen} type="login-signup">
          <LoginSignupModal />
        </Modal>
      )}
    </div>
  );
};
