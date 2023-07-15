import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./reducers/auth.reducer";
import { systemReducer } from "./reducers/system.reducer";
import { quizReducer } from "./reducers/quiz.reducer";
import { userReducer } from "./reducers/user.reducer";
import { modalReducer } from "./reducers/modal.reducer";
import { questionReducer } from "./reducers/question.reducer";

const rootReducer = combineReducers({
  authModule: authReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  modalModule: modalReducer,
  quizModule: quizReducer,
  questionModule: questionReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware))
);

export type RootState = ReturnType<typeof store.getState>;
