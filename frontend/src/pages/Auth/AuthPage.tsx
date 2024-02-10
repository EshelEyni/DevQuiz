import { useState, useRef, useEffect } from "react";
import { UserCredentials } from "../../types/auth.types";
import { useDispatch } from "react-redux";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { changePassword, login, signup } from "../../store/slices/authSlice";
import { AppDispatch } from "../../types/app.types";
import { MainScreen } from "../../components/Gen/MainScreen";
import { useGoToParentPage } from "../../hooks/useGoToParentPage";
import classnames from "classnames";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Btns/Button";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { ErrMsg } from "../../components/Msg/ErrMsg";
import { useSearchParams } from "react-router-dom";
import authService from "../../services/auth.service";
import toast from "react-hot-toast";

type FormType = "login" | "signup" | "resetPassword";

const defaultValues: UserCredentials = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

if (process.env.NODE_ENV === "development") {
  defaultValues.username = "TESTPASS22";
  defaultValues.password = "TESTPASS22";
}

const AuthPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const goToParentPage = useGoToParentPage();
  const { queryState } = useAuth();
  const isLoading = queryState.state === "loading";
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken");
  const [formType, setFormType] = useState<FormType>("login");
  const [isWrongPassword, setIsWrongPassword] = useState(false);

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
    switch (formType) {
      case "login": {
        const { username, password } = data;
        dispatch(login(username, password));
        break;
      }
      case "signup": {
        dispatch(signup(data));
        break;
      }
      case "resetPassword": {
        const { password, passwordConfirm } = data;
        if (resetToken)
          return dispatch(
            changePassword({ resetToken, password, passwordConfirm }),
          );
        console.error("No reset token found");
        toast.error("No reset token found in the URL");
        break;
      }
    }
  }

  function getFormText() {
    switch (formType) {
      case "login":
        return "Login";
      case "signup":
        return "Sign up";
      case "resetPassword":
        return "Reset Password";
      default:
        return "Login";
    }
  }

  function onToggleForm() {
    clearErrors();
    if (formType === "login") return setFormType("signup");
    if (formType === "signup") return setFormType("login");
  }

  async function handleSendResetPasswordEmail() {
    try {
      const username = watch("username");
      await authService.sendResetPasswordEmail(username);
      setIsWrongPassword(false);
      toast.success("An email has been sent to you with instructions");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later");
    }
  }

  const inputClassName =
    "w-full rounded border text-gray-950 border-gray-300 px-2 text-2xl focus:border-blue-500 focus:outline-none h-16 md:h-12";

  useEffect(() => {
    if (queryState.state !== "succeeded") return;
    goToParentPage();

    return () => {
      reset();
      clearErrors();
    };
  }, [reset, clearErrors, queryState.state, goToParentPage]);

  useEffect(() => {
    if (resetToken) setFormType("resetPassword");
  }, [resetToken]);

  useEffect(() => {
    if (queryState.error === "Incorrect username or password")
      setIsWrongPassword(true);
  }, [queryState.error]);

  return (
    <>
      <MainScreen onClickFn={goToParentPage} darkMode={true} />

      <main
        className={classnames(
          "h- fixed left-1/2 top-1/2 z-[1000] flex h-full min-h-min w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-scroll bg-gray-50 px-3 pt-5 md:h-1/2 md:max-h-[400px] md:w-1/2 md:rounded-xl",
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
            <h1 className="mb-6 mt-10 text-center text-6xl font-bold text-gray-700 md:mt-0 md:text-5xl">
              {getFormText()}
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full max-w-xl flex-col items-center justify-center gap-4 rounded-lg p-3 sm:max-w-2xl md:max-w-lg"
            >
              {formType !== "resetPassword" && (
                <>
                  <input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    placeholder="Username"
                    className={inputClassName}
                  />
                  {errors.username && <ErrMsg msg={errors.username.message} />}
                </>
              )}

              {formType === "signup" && (
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
                    <ErrMsg
                      msg={
                        errors.email.type === "required"
                          ? "Email is required"
                          : "Email is invalid"
                      }
                    />
                  )}
                </>
              )}
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className={inputClassName}
              />

              {formType !== "login" && (
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
                    <ErrMsg msg={errors.passwordConfirm.message} />
                  )}
                </>
              )}

              {isWrongPassword && (
                <Button
                  className="flex items-center gap-1"
                  onClickFn={handleSendResetPasswordEmail}
                >
                  <span className="text-2xl text-gray-800">
                    Forgot your password?
                  </span>
                  <span className="text-2xl text-blue-500 hover:underline">
                    Click here to reset it
                  </span>
                </Button>
              )}

              <Button
                type="submit"
                className="mt-2 rounded-full bg-gray-700 px-8 py-6 text-4xl font-medium leading-none text-white transition-all duration-300 hover:scale-105 md:px-5 md:py-3 md:text-2xl"
              >
                {getFormText()}
              </Button>
              {formType !== "resetPassword" && (
                <p className="mt-6 flex items-center gap-1 text-3xl text-gray-700 md:text-2xl">
                  {formType === "login" && (
                    <span>Don&apos;t have an account?</span>
                  )}
                  {formType === "signup" && (
                    <span>Already have an account?</span>
                  )}
                  <span
                    onClick={onToggleForm}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    {formType === "login" ? "Sign up" : "Log in"}
                  </span>
                </p>
              )}
            </form>
            {queryState.state === "failed" && <ErrMsg msg={queryState.error} />}
          </>
        )}
      </main>
    </>
  );
};

export default AuthPage;
