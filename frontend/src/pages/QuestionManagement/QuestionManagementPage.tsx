import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { QuestionSearchBar } from "./QuestionSearchBar";
import { useEffect, useState } from "react";
import { getQuestions } from "../../store/slices/questionSlice";
import { AppDispatch } from "../../types/app.types";
import { useQuestionEditToast } from "../../hooks/useQuestionEditToast";
import { Button } from "../../components/Btns/Button";
import classnames from "classnames";
import QuestionEdit from "../QuestionEdit/QuestionEdit";
import { QuestionFetcher } from "./QuestionFetcher";
import { QuestionList } from "./QuestionList";
import { useQuestion } from "../../hooks/useQuestion";
import { questionReqProps } from "../../store/types";
import { useAuth } from "../../hooks/useAuth";

export type FilterBy = "search" | "add" | "fetch";

type Btn = {
  name: string;
  value: FilterBy;
};

const QuestionManagementPage = () => {
  useQuestionEditToast();
  const dispatch: AppDispatch = useDispatch();
  const { loggedInUser } = useAuth();
  const { filterBy: searchFilterBy } = useQuestion();

  const [filterBy, setFilterBy] = useState<FilterBy>("search");

  const btns: Btn[] = [
    {
      name: "Search",
      value: "search",
    },
    {
      name: "Add",
      value: "add",
    },
    {
      name: "Fetch",
      value: "fetch",
    },
  ];

  useEffect(() => {
    if (filterBy !== "search" || !loggedInUser) return;
    const options = {
      language: searchFilterBy.language,
      page: 1,
      limit: 0,
      searchTerm: searchFilterBy.searchTerm,
      isMarkedToBeRevised: searchFilterBy.marked.value,
      isRevised: searchFilterBy.approved.value,
      isManagePage: true,
    } as questionReqProps;

    if (searchFilterBy.level && searchFilterBy.level !== "all")
      options.level = searchFilterBy.level;

    dispatch(getQuestions(options));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterBy, loggedInUser]);

  return (
    <main className="flex w-screen flex-1 flex-col items-center">
      <div className="flex w-full justify-center gap-4 bg-gray-800 p-3">
        {btns.map((btn, i) => (
          <Button
            key={i}
            onClickFn={() => setFilterBy(btn.value)}
            className={classnames(
              "rounded-md px-6 py-4 text-3xl font-bold",
              filterBy === btn.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800",
            )}
          >
            {btn.name}
          </Button>
        ))}
      </div>

      {filterBy === "search" && (
        <>
          <QuestionSearchBar />
          <QuestionList />
        </>
      )}
      {filterBy === "add" && (
        <QuestionEdit isNested={false} setFilterBy={setFilterBy} />
      )}
      {filterBy === "fetch" && <QuestionFetcher />}
      <Outlet />
    </main>
  );
};

export default QuestionManagementPage;
