import React from "react";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/types";
import { setFilter } from "../../../store/actions/question.actions";
import "./QuestionSearchInput.scss";

export const QuestionSearchInput = () => {
  const { filterBy } = useSelector((state: RootState) => state.questionModule);
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
