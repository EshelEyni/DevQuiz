import { ContactMessage, ReportQuestionMessage } from "../../../../shared/types/system";
import { actionTypes } from "../actions/contact.actions";

const {
  SET_IS_LOADING,
  SET_CONTACT_MSGS,
  SET_CONTACT_MSG,
  ADD_CONTACT_MSG,
  UPDATE_CONTACT_MSG,
  REMOVE_CONTACT_MSG,
} = actionTypes;

type ContactMsgState = {
  contactMsgs: Array<ContactMessage | ReportQuestionMessage>;
  contactMsg: ContactMessage | ReportQuestionMessage | null;
  isLoading: boolean;
};

const initialState: ContactMsgState = {
  contactMsgs: [],
  contactMsg: null,
  isLoading: false,
};

export function contactMsgReducer(
  state = initialState,
  action: {
    type: string;
    contactMsgs: Array<ContactMessage | ReportQuestionMessage>;
    contactMsg: ContactMessage | ReportQuestionMessage;
    contactMsgId: string;
    updatedContactMsg: ContactMessage | ReportQuestionMessage;
    isLoading: boolean;
  }
): ContactMsgState {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_CONTACT_MSGS:
      return { ...state, contactMsgs: action.contactMsgs };
    case SET_CONTACT_MSG:
      return { ...state, contactMsg: action.contactMsg };
    case UPDATE_CONTACT_MSG:
      return {
        ...state,
        contactMsgs: state.contactMsgs.map(contactMsg =>
          contactMsg.id === action.updatedContactMsg.id ? action.updatedContactMsg : contactMsg
        ),
      };
    case ADD_CONTACT_MSG:
      return { ...state, contactMsgs: [...state.contactMsgs, action.contactMsg] };
    case REMOVE_CONTACT_MSG:
      return {
        ...state,
        contactMsgs: state.contactMsgs.filter(contactMsg => contactMsg.id !== action.contactMsgId),
      };
    default:
      return state;
  }
}
