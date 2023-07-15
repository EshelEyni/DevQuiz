import { useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { AppDispatch } from "../../store/types";
import { Question } from "../../../../shared/types/question";
import OptionDisplay from "./OptionDisplay";
import { useKey } from "react-use";

type OptionListProps = {
  question: Question;
};

type TypeOfFocusState = {
  currIdx: number;
  arr: boolean[];
  lastIdx: number;
  isDisabled: boolean;
};

class FocusState implements TypeOfFocusState {
  currIdx: number;
  arr: boolean[];
  lastIdx: number;
  isDisabled: boolean;
  constructor(arrLength: number) {
    this.currIdx = 0;
    this.arr = new Array(arrLength).fill(false);
    this.lastIdx = arrLength - 1;
    this.isDisabled = false;
  }
}

function OptionList({ question }: OptionListProps) {
  const dispatch: AppDispatch = useDispatch();
  const [focusState, setFocusState] = useState(new FocusState(question.options.length));
  const isDisabledRef = useRef(focusState.isDisabled);
  const currFocusIdxRef = useRef(focusState.currIdx);

  useKey("ArrowUp", () => {
    if (isDisabledRef.current) return;
    setFocusState(prevState => {
      const newArr = new Array(prevState.arr.length).fill(false);
      let newCurrIdx = prevState.currIdx - 1;
      if (newCurrIdx < 0) newCurrIdx = prevState.lastIdx;
      newArr[newCurrIdx] = true;
      return { ...prevState, arr: newArr, currIdx: newCurrIdx };
    });
  });

  useKey("ArrowDown", () => {
    if (isDisabledRef.current) return;
    setFocusState(prevState => {
      const newArr = new Array(prevState.arr.length).fill(false);
      const newCurrIdx = (prevState.currIdx + 1) % newArr.length;
      newArr[newCurrIdx] = true;
      return { ...prevState, arr: newArr, currIdx: newCurrIdx };
    });
  });

  useKey("Enter", () => {
    clearOptionFocusArray();
    const optionIdx = currFocusIdxRef.current;
    onOptionSelection(optionIdx);
  });

  function handleOptionClick(optionIdx: number) {
    onOptionSelection(optionIdx);
  }

  function onOptionSelection(optionIdx: number) {
    console.log("onOptionSelection", optionIdx);
    disableOptionFocus();
    dispatch({ type: "SET_ANSWER_IDX", payload: optionIdx });
    const isOptionCorrect = question.correctOption === optionIdx;
    console.log("isOptionCorrect", isOptionCorrect, question.correctOption, optionIdx);
    if (isOptionCorrect) dispatch({ type: "SET_POINTS" });
  }

  function clearOptionFocusArray() {
    setFocusState(prevState => {
      const newArr = new Array(prevState.arr.length).fill(false);
      return { ...prevState, arr: newArr };
    });
  }

  function disableOptionFocus() {
    setFocusState(prevState => {
      return { ...prevState, isDisabled: true };
    });
  }

  useEffect(() => {
    document.addEventListener("mousemove", clearOptionFocusArray);
    return () => {
      document.removeEventListener("mousemove", clearOptionFocusArray);
    };
  }, []);

  useEffect(() => {
    isDisabledRef.current = focusState.isDisabled;
  }, [focusState.isDisabled]);

  useEffect(() => {
    currFocusIdxRef.current = focusState.currIdx;
  }, [focusState.currIdx]);

  useEffect(() => {
    setFocusState(new FocusState(question.options.length));
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
}

export default OptionList;
