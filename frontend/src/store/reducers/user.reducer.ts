import { User } from "../../../../shared/types/user";
import { actionTypes } from "../actions/user.actions";

const { SET_USERS, SET_USER, REMOVE_USER, SET_IS_LOADING } = actionTypes;

const initialState: {
  users: User[];
  user: User | null;
  userMsg: string | null;
  isLoading: boolean;
} = {
  users: [],
  user: null,
  userMsg: null,
  isLoading: false,
};

export function userReducer(
  state = initialState,
  action: {
    type: string;
    users: User[];
    user: User;
    userId: string;
    updatedUser: User;
    isLoading: boolean;
  }
) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.userId),
      };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
