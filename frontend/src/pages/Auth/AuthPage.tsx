import { useState, FormEvent } from "react";
import { LoginForm } from "../../components/Form/LoginForm/LoginForm";
import { SignupForm } from "../../components/Form/SignupForm/SignupForm";
import { UserCredentials } from "../../types/auth.types";
import { useDispatch } from "react-redux";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { login, signup } from "../../store/slices/authSlice";
import { AppDispatch } from "../../types/app.types";
import { MainScreen } from "../../components/Gen/MainScreen";
import { useGoToParentPage } from "../../hooks/useGoToParentPage";
import classnames from "classnames";
import { useAuth } from "../../hooks/useAuth";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const AuthPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const goToParentPage = useGoToParentPage();
  const { queryState } = useAuth();
  const isLoading = queryState.state === "loading";
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [userCredentials, setUserCredentials] =
    useState<UserCredentials>(initialState);

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setUserCredentials(prevState => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoginForm) {
      const { username, password } = userCredentials;
      dispatch(login(username, password));
    } else dispatch(signup(userCredentials));
    goToParentPage();
  }

  function onToggleForm() {
    setIsLoginForm(s => !s);
  }

  return (
    <>
      <MainScreen onClickFn={goToParentPage} darkMode={true} />

      <main
        className={classnames(
          "fixed left-1/2 top-1/2 z-[1000] flex h-full min-h-min w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-scroll bg-gray-50 px-3 pt-5 lg:h-[60vh] lg:w-[50vw] lg:rounded-xl",
          { "justify-center": isLoading },
        )}
      >
        {isLoading && <Loader />}
        {!isLoading && isLoginForm ? (
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
      </main>
    </>
  );
};
