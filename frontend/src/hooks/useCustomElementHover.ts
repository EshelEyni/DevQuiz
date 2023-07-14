import { useState, useRef, useEffect } from "react";
import { debounce } from "../services/utils.service";

type ElementsHoverState = {
  [elementName: string]: boolean;
};

export const useCustomElementHover = (initialElementsState: ElementsHoverState) => {
  const [elementsHoverState, setElementsHoverState] = useState(initialElementsState);

  const debounced = useRef(
    debounce((elementName: string) => {
      setElementsHoverState(prevState => ({
        ...prevState,
        [elementName]: !prevState[elementName],
      }));
    }, 500)
  );

  useEffect(() => {
    return () => {
      debounced.current.cancel();
    };
  }, []);

  const handleMouseEnter = (elementName: string) => {
    debounced.current.debouncedFunc(elementName);
  };

  const handleMouseLeave = (elementName: string) => {
    debounced.current.cancel();
    setElementsHoverState(prevState => ({
      ...prevState,
      [elementName]: false,
    }));
  };

  return { elementsHoverState, handleMouseEnter, handleMouseLeave };
};
