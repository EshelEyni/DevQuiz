import { useState, FormEvent } from "react";
import { LoginForm } from "../../components/Form/LoginForm/LoginForm";
import { SignupForm } from "../../components/Form/SignupForm/SignupForm";
import { UserCredentials } from "../../types/auth.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { Loader } from "../../components/Loaders/Loader/Loader";
import "./AuthPage.scss";
import { login, signup } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const AuthPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [userCredentials, setUserCredentials] =
    useState<UserCredentials>(initialState);

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
    navigate("/home");
  }

  function onToggleForm() {
    setIsLoginForm(s => !s);
  }
  return (
    <div className="modal modal-login-signup">
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
};
