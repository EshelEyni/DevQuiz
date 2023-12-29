import { useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { AppDispatch } from "../../../store/types";
import { Question } from "../../../../../shared/types/question";
import { OptionDisplay } from "../OptionDisplay/OptionDisplay";
import "./OptionList.scss";
import userService from "../../../services/user.service";
import { useAuth } from "../../../hooks/useAuth";
import { setAnswerIdx, setPoints } from "../../../store/slices/quizSlice";

type OptionListProps = {
  question: Question;
};

type TypeOfFocusState = {
  currIdx: number;
  arr: boolean[];
  lastIdx: number;
};

function initialFocusState(arrLength: number): TypeOfFocusState {
  return {
    currIdx: 0,
    arr: new Array(arrLength).fill(false),
    lastIdx: arrLength - 1,
  };
}

export const OptionList = ({ question }: OptionListProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { loggedInUser } = useAuth();
  const [focusState, setFocusState] = useState(
    initialFocusState(question.options.length),
  );
  const [isUserSelectedOption, setIsUserSelectedOption] = useState(false);
  const [hasMouseClearedFocus, setHasMouseClearedFocus] = useState(false);

  function handleOptionClick(optionIdx: number) {
    onOptionSelection(optionIdx);
  }

  const onOptionSelection = useCallback(
    (optionIdx: number) => {
      setIsUserSelectedOption(true);
      dispatch(setAnswerIdx(optionIdx));
      const isOptionCorrect = question.correctOption === optionIdx;
      if (!isOptionCorrect) return;
      dispatch(setPoints(question.points));
      if (!loggedInUser) return;
      userService.recordUserCorrectAnswer(question);
    },
    [dispatch, loggedInUser, question],
  );

  function clearFocusByKeyboards() {
    setFocusState(prevState => {
      const newArr = new Array(prevState.arr.length).fill(false);
      return { ...prevState, arr: newArr };
    });
  }

  useEffect(() => {
    function handleArrowUp() {
      if (isUserSelectedOption) return;
      setHasMouseClearedFocus(false);
      setFocusState(prevState => {
        const newArr = new Array(prevState.arr.length).fill(false);
        let newCurrIdx = prevState.currIdx - 1;
        if (newCurrIdx < 0) newCurrIdx = prevState.lastIdx;
        newArr[newCurrIdx] = true;
        return { ...prevState, arr: newArr, currIdx: newCurrIdx };
      });
    }

    function handleArrowDown() {
      if (isUserSelectedOption) return;
      setHasMouseClearedFocus(false);
      setFocusState(prevState => {
        const newArr = new Array(prevState.arr.length).fill(false);
        const newCurrIdx = (prevState.currIdx + 1) % newArr.length;
        newArr[newCurrIdx] = true;
        return { ...prevState, arr: newArr, currIdx: newCurrIdx };
      });
    }

    function handleMouseMove() {
      if (hasMouseClearedFocus) return;
      setHasMouseClearedFocus(true);
      clearFocusByKeyboards();
    }

    function handleEnter() {
      clearFocusByKeyboards();
      onOptionSelection(focusState.currIdx);
    }

    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowUp":
          handleArrowUp();
          break;
        case "ArrowDown":
          handleArrowDown();
          break;
        case "Enter":
          handleEnter();
          break;
        default:
          break;
      }
    }

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    focusState,
    onOptionSelection,
    hasMouseClearedFocus,
    isUserSelectedOption,
  ]);

  useEffect(() => {
    setIsUserSelectedOption(false);
    setHasMouseClearedFocus(false);
    setFocusState(initialFocusState(question.options.length));
  }, [question]);

  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <OptionDisplay
          key={idx}
          isFocused={focusState.arr[idx]}
          option={option}
          optionIdx={idx}
          correctOption={question.correctOption}
          handleOptionClick={handleOptionClick}
        />
      ))}
    </div>
  );
};
