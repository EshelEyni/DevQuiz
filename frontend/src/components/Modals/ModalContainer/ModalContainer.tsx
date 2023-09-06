import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  toggleIsContactModalOpen,
  toggleIsLoginSignupModalOpen,
  toggleIsReportQuestionModalOpen,
} from "../../../store/actions/modal.actions";
import { ReportQuestionModal } from "../../Modals/ReportQuestionModal/ReportQuestionModal";
import { Modal } from "../../Modals/Modal/Modal";
import { LoginSignupModal } from "../../Modals/LoginSignupModal/LoginSignupModal";

export const ModalContainer = () => {
  const { isContactOpen, isReportQuestionOpen, isLoginSignupOpen } =
    useSelector((state: RootState) => state.modalModule);

  return (
    <>
      {isReportQuestionOpen && (
        <Modal onClickMainScreenFn={toggleIsReportQuestionModalOpen}>
          <ReportQuestionModal />
        </Modal>
      )}

      {isLoginSignupOpen && (
        <Modal
          onClickMainScreenFn={toggleIsLoginSignupModalOpen}
          type="login-signup"
        >
          <LoginSignupModal />
        </Modal>
      )}
    </>
  );
};
