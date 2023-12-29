import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/types";
import "./QuestionSearchInput.scss";
import { useQuestion } from "../../../hooks/useQuestion";
import { setFilter } from "../../../store/slices/questionSlice";

export const QuestionSearchInput = () => {
  const { filterBy } = useQuestion();
  const { searchTerm } = filterBy;
  const dispatch: AppDispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value;
    dispatch(setFilter({ ...filterBy, searchTerm }));
  }

  return (
    <input
      className="question-search-input"
      type="text"
      value={searchTerm}
      placeholder="Search for a question"
      onChange={handleChange}
    />
  );
};
