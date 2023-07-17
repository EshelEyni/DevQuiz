import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  toggleIsContactModalOpen,
  toggleIsLoginSignupModalOpen,
  toggleIsReportQuestionModalOpen,
} from "../../store/actions/modal.actions";
import { ContactModal } from "../../components/modals/ContactModal";
import { ReportQuestionModal } from "../../components/modals/ReportQuestionModal";
import { Modal } from "../../components/modals/Modal";
import { LoginSignupModal } from "../../components/modals/LoginSignupModal";

export const ModalContainer = () => {
  const { isContactOpen, isReportQuestionOpen, isLoginSignupOpen } = useSelector(
    (state: RootState) => state.modalModule
  );

  return (
    <>
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
    </>
  );
};
