import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../components/Btns/Button";
import {
  AppDispatch,
  LanguageAndLevel,
  QueryState,
} from "../../types/app.types";
import { logout, updateLoggedInUser } from "../../store/slices/authSlice";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { Header } from "../../components/Gen/Header";
import {
  ProgrammingLanguage,
  QuestionAnswerCount,
  UserStats,
} from "../../../../shared/types/system";
import userService from "../../services/user.service";
import { StatsDisplay } from "./StatsDisplay";
import {
  defaultQueryState,
  getErrorMessage,
} from "../../services/utils.service";
import { ErrMsg } from "../../components/Msg/ErrMsg";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

type UserDetails = {
  username: string;
  email: string;
};

const ProfileDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loggedInUser } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isEditShown, setIsEditShown] = useState(false);
  const [userStatsQueryState, setUserStatsQueryState] =
    useState<QueryState>(defaultQueryState);
  const isStatsShown =
    userStatsQueryState.state === "succeeded" && userStats && !isEditShown;
  const isStatsLoading = userStatsQueryState.state === "loading";
  const { id } = params;
  const isCurrUser = loggedInUser && loggedInUser.id === id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>({});

  const btns = [
    {
      onClickFn: handleLogoutClick,
      text: "Logout",
    },
    {
      onClickFn: handleEditStatsClick,
      text: isEditShown ? "Stats" : "Edit",
    },
  ];

  async function fetchUserStats() {
    try {
      setUserStatsQueryState(p => ({ ...p, state: "loading" }));
      const userStats = await userService.getUserStats();
      setUserStats(userStats);
      setUserStatsQueryState(p => ({ ...p, state: "succeeded" }));
    } catch (err) {
      const error = getErrorMessage(err);
      setUserStatsQueryState(p => ({ ...p, state: "failed", error }));
    }
  }

  useEffect(() => {
    if (!isCurrUser || !!userStats) return;
    fetchUserStats();
  }, [isCurrUser, userStats]);

  function handleLogoutClick() {
    dispatch(logout());
    navigate("/home");
  }

  function handleEditStatsClick() {
    setIsEditShown(p => !p);
  }

  async function onRestart({ language, level }: LanguageAndLevel) {
    try {
      setUserStatsQueryState(p => ({ ...p, state: "loading" }));
      await userService.removeUserCorrectAnswers({
        language: language,
        level,
      });
      const userStats = await userService.getUserStats();
      setUserStats(userStats);
      setUserStatsQueryState(p => ({ ...p, state: "succeeded" }));
    } catch (err) {
      const error = getErrorMessage(err);
      setUserStatsQueryState(p => ({ ...p, state: "failed", error }));
    }
  }

  function onSubmit(data: { username: string; email: string }) {
    if (!loggedInUser) return;
    dispatch(updateLoggedInUser({ ...loggedInUser, ...data }));
    setIsEditShown(false);
  }

  return (
    <main className="flex min-h-[250px] w-screen flex-col items-center overflow-hidden px-8 pb-24">
      {!isCurrUser && <Loader className="mt-52" />}

      {isCurrUser && (
        <div className="mt-5 flex w-full flex-col items-center gap-6 md:w-4/5">
          <Header className="flex w-full flex-col gap-4">
            <h1 className="text-4xl font-semibold tracking-wider">
              {loggedInUser.username}
            </h1>

            <div className="flex items-center gap-3 self-start">
              {btns.map((btn, i) => (
                <Button
                  key={i}
                  onClickFn={btn.onClickFn}
                  className="transform rounded-full bg-gray-800 px-6 py-4 text-3xl font-semibold uppercase transition-all duration-300 ease-in-out hover:scale-105"
                >
                  {btn.text}
                </Button>
              ))}
            </div>
          </Header>
          {isEditShown && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 flex flex-col items-center gap-4 rounded-xl bg-gray-600 p-6"
            >
              <input
                {...register("username", { required: "Username is required" })}
                placeholder="Username"
                className="text-md w-64 transform rounded-full bg-gray-800 p-3 font-semibold uppercase transition-all duration-300 ease-in-out hover:scale-105"
                defaultValue={loggedInUser.username || ""}
              />
              {errors.username && <ErrMsg msg={errors.username.message} />}
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                placeholder="Email"
                className="text-md w-64 transform rounded-full bg-gray-800 p-3 font-semibold uppercase transition-all duration-300 ease-in-out hover:scale-105"
                defaultValue={loggedInUser.email || ""}
              />
              {errors.email && <ErrMsg msg={errors.email.message} />}
              <Button
                type="submit"
                className="text-md mt-5 w-20 transform rounded-full bg-gray-800 p-3 font-semibold uppercase transition-all duration-300 ease-in-out hover:scale-105"
              >
                Save
              </Button>
            </form>
          )}

          <ul className="stats-list">
            {isStatsLoading && <Loader className="mt-10 self-center" />}
            {isStatsShown && (
              <>
                {Object.entries(userStats.answersCount).map(([key, value]) => (
                  <StatsDisplay
                    answerLanguage={key as ProgrammingLanguage}
                    answerCount={value as QuestionAnswerCount}
                    questionCount={
                      userStats.questionsCount[
                        key as ProgrammingLanguage
                      ] as QuestionAnswerCount
                    }
                    onRestart={onRestart}
                    key={key}
                  />
                ))}
              </>
            )}
          </ul>
        </div>
      )}
    </main>
  );
};

export default ProfileDetails;
