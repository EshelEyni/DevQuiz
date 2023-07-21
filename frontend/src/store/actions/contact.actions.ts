import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";
import contactService from "../../services/contact.service";

// import { contactReqProps } from "../types";
import { ContactMessage, ContactMsgType } from "../../../../shared/types/system";

export const actionTypes = {
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_CONTACT_MSGS: "SET_CONTACT_MSGS",
  SET_CONTACT_MSG: "SET_CONTACT_MSG",
  ADD_CONTACT_MSG: "ADD_CONTACT_MSG",
  REMOVE_CONTACT_MSG: "REMOVE_CONTACT_MSG",
  UPDATE_CONTACT_MSG: "UPDATE_CONTACT_MSG",
};

const {
  SET_IS_LOADING,
  SET_CONTACT_MSGS,
  SET_CONTACT_MSG,
  ADD_CONTACT_MSG,
  UPDATE_CONTACT_MSG,
  REMOVE_CONTACT_MSG,
} = actionTypes;

export function getContactMsgs(): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, isLoading: true });
      const contactMsgs = await contactService.query();
      dispatch({ type: SET_CONTACT_MSGS, contactMsgs });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    } catch (err) {
      console.log("ContactActions: err in getContactMsgs", err);
    }
  };
}

export function getContactMsgById(
  contactMsgId: string,
  type: ContactMsgType
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, isLoading: true });
      const contactMsg = await contactService.getById(contactMsgId, type);
      dispatch({ type: SET_CONTACT_MSG, contactMsg });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    } catch (err) {
      console.log("ContactActions: err in getContactMsgById", err);
    }
  };
}

export function addContactMsg(
  contactMsg: ContactMessage,
  type: ContactMsgType
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, isLoading: true });
      const addedContactMsg = await contactService.add(contactMsg, type);
      dispatch({ type: ADD_CONTACT_MSG, contactMsg: addedContactMsg });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    } catch (err) {
      console.log("ContactActions: err in addContactMsg", err);
    }
  };
}

export function updateContactMsg(
  contactMsg: ContactMessage,
  type: ContactMsgType
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, isLoading: true });
      const updatedContactMsg = await contactService.update(contactMsg, type);
      dispatch({ type: UPDATE_CONTACT_MSG, updatedContactMsg });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    } catch (err) {
      console.log("ContactActions: err in updateContactMsg", err);
    }
  };
}

export function removeContactMsg(
  contactMsgId: string,
  type: ContactMsgType
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, isLoading: true });
      await contactService.remove(contactMsgId, type);
      dispatch({ type: REMOVE_CONTACT_MSG, contactMsgId });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    } catch (err) {
      console.log("ContactActions: err in removeContactMsg", err);
    }
  };
}
