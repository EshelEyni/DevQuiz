import { actionTypes } from "../actions/modal.actions";
const {
  TOGGLE_IS_CONTACT_MODAL_OPEN,
  TOGGLE_IS_REPORT_QUESTION_MODAL_OPEN,
  TOGGLE_IS_LOGIN_SIGNUP_MODAL_OPEN,
  TOGGLE_IS_QUESTION_ARCHIVE_MODAL_OPEN,
} = actionTypes;

type ModalState = {
  isContactOpen: boolean;
  isReportQuestionOpen: boolean;
  isLoginSignupOpen: boolean;
  isQuestionArchiveOpen: boolean;
};

const initialState: ModalState = {
  isContactOpen: false,
  isReportQuestionOpen: false,
  isLoginSignupOpen: false,
  isQuestionArchiveOpen: false,
};

export function modalReducer(state = initialState, action: { type: string }) {
  switch (action.type) {
    case TOGGLE_IS_CONTACT_MODAL_OPEN:
      return {
        ...state,
        isContactOpen: !state.isContactOpen,
      };
    case TOGGLE_IS_REPORT_QUESTION_MODAL_OPEN:
      return {
        ...state,
        isReportQuestionOpen: !state.isReportQuestionOpen,
      };
    case TOGGLE_IS_LOGIN_SIGNUP_MODAL_OPEN:
      return {
        ...state,
        isLoginSignupOpen: !state.isLoginSignupOpen,
      };
    case TOGGLE_IS_QUESTION_ARCHIVE_MODAL_OPEN:
      return {
        ...state,
        isQuestionArchiveOpen: !state.isQuestionArchiveOpen,
      };
    default:
      return state;
  }
}
