import { useState, FormEvent } from "react";
import LoginForm from "../form/LoginForm";
import SignupForm from "../form/SignupForm";
import { login, signup } from "../../store/actions/auth.actions";
import { UserCredentials } from "../../types/auth.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { toggleIsLoginSignupModalOpen } from "../../store/actions/system.actions";
import Loader from "../loaders/Loader";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function LoginSignupModal() {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [userCredentials, setUserCredentials] = useState<UserCredentials>(initialState);

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setUserCredentials(prevState => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    if (isLoginForm) {
      const { username, password } = userCredentials;
      dispatch(login(username, password));
    } else dispatch(signup(userCredentials));
    dispatch(toggleIsLoginSignupModalOpen());
  }

  function onToggleForm() {
    setIsLoginForm(s => !s);
  }
  return (
    <div className="modal-login-signup">
      {isLoading ? (
        <Loader />
      ) : isLoginForm ? (
        <LoginForm
          onToggleForm={onToggleForm}
          userCredentials={userCredentials}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <SignupForm
          onToggleForm={onToggleForm}
          userCredentials={userCredentials}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default LoginSignupModal;
