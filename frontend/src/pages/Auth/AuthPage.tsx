import { useState, useRef, useEffect } from "react";
import { UserCredentials } from "../../types/auth.types";
import { useDispatch } from "react-redux";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { login, signup } from "../../store/slices/authSlice";
import { AppDispatch } from "../../types/app.types";
import { MainScreen } from "../../components/Gen/MainScreen";
import { useGoToParentPage } from "../../hooks/useGoToParentPage";
import classnames from "classnames";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Btns/Button/Button";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

const defaultValues: UserCredentials = {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    reset,
  } = useForm<UserCredentials>({ defaultValues });

  const password = useRef({});
  password.current = watch("password", "");

  function onSubmit(data: UserCredentials) {
    if (isLoginForm) {
      const { username, password } = data;
      dispatch(login(username, password));
    } else dispatch(signup(data));
  }

  function onToggleForm() {
    clearErrors();
    setIsLoginForm(s => !s);
  }

  const inputClassName =
    "w-full rounded border text-gray-950 border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none";

  useEffect(() => {
    if (queryState.state !== "succeeded") return;
    goToParentPage();

    return () => {
      reset();
      clearErrors();
    };
  }, [reset, clearErrors, queryState.state, goToParentPage]);

  return (
    <>
      <MainScreen onClickFn={goToParentPage} darkMode={true} />

      <main
        className={classnames(
          "h- fixed left-1/2 top-1/2 z-[1000] flex h-full min-h-min w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-scroll bg-gray-50 px-3 pt-5 md:h-1/2 md:w-1/2 md:rounded-xl",
          { "justify-center": isLoading },
        )}
      >
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <Button
              className="flex h-10 w-10 items-center justify-center self-end rounded-full text-center hover:bg-gray-200 hover:text-gray-700 md:!hidden"
              onClickFn={goToParentPage}
            >
              <IoClose className="text-3xl" />
            </Button>
            <h1 className="mt-10 text-center text-4xl font-bold text-gray-700 md:mt-0">
              {isLoginForm ? "Login" : "Sign up"}
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-lg p-6"
            >
              <input
                {...register("username", { required: "Username is required" })}
                placeholder="Username"
                className={inputClassName}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
              {!isLoginForm && (
                <>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+\.\S+$/,
                    })}
                    placeholder="Email"
                    className={inputClassName}
                  />
                  {errors.email && (
                    <p className="text-red-500">Email is not valid</p>
                  )}
                </>
              )}
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className={inputClassName}
              />

              {!isLoginForm && (
                <>
                  <input
                    {...register("passwordConfirm", {
                      validate: value =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                    type="password"
                    placeholder="Confirm Password"
                    className={inputClassName}
                  />
                  {errors.passwordConfirm && (
                    <p className="text-red-500">
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                </>
              )}

              <Button type="submit" className="px-4 py-2 text-lg">
                {isLoginForm ? "Login" : "Sign up"}
              </Button>
              <p className="text-lg text-gray-700">
                {isLoginForm
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span
                  onClick={onToggleForm}
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  {isLoginForm ? "Sign up" : "Log in"}
                </span>
              </p>
            </form>
            {queryState.state === "failed" && (
              <p className="text-red-500">{queryState.error}</p>
            )}
          </>
        )}
      </main>
    </>
  );
};
