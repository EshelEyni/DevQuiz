import {
  FC,
  useState,
  createContext,
  useContext,
  cloneElement,
  useRef,
} from "react";
import { AnyFunction } from "../../../../shared/types/system";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { makeId } from "../../services/utils.service";
import { createPortal } from "react-dom";
import { UseWheelListener } from "../../hooks/UseWheelListener";

type SelectProps = {
  children: React.ReactNode;
  onChange: AnyFunction;
};

type SelectContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: AnyFunction;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
  selectTriggerId: string;
};

type SelectTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

type SelectListProps = {
  children: React.ReactNode;
  className?: string;
};

type SelectItemProps = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  className?: string;
};

type Position = {
  top?: string;
  bottom?: string;
  left?: string;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelect() {
  const context = useContext(SelectContext);
  if (context === undefined) {
    throw new Error("useSelect must be used within a Select");
  }
  return context;
}

function calculatePositionByRef<T extends HTMLElement>(
  ref: React.RefObject<T>,
) {
  const rect = ref.current?.getBoundingClientRect();
  if (!rect) return null;
  const elementWidth = rect.width;
  const verticalPosition = { top: `${rect.bottom}px` };
  const horizontalMidpoint = rect.left + rect.width / 2;
  const horizontalPosition = {
    left: `${horizontalMidpoint}px`,
    transform: `translateX(-${elementWidth / 2}px)`,
  };

  const position = {
    ...verticalPosition,
    ...horizontalPosition,
  };

  return position;
}

export const Select: FC<SelectProps> & {
  SelectTrigger: FC<SelectTriggerProps>;
  SelectList: FC<SelectListProps>;
  SelectItem: FC<SelectItemProps>;
} = ({ children, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const selectTriggerId = makeId();
  const value: SelectContextType = {
    isOpen,
    setIsOpen,
    onChange,
    position,
    setPosition,
    selectTriggerId,
  };

  return (
    <SelectContext.Provider value={value}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger: FC<SelectTriggerProps> = ({ children, className }) => {
  const { isOpen, setIsOpen, setPosition, selectTriggerId } = useSelect();
  const ref = useRef<HTMLButtonElement>(null);

  function handleTriggerClick() {
    if (!isOpen) calcPosition();
    setIsOpen(prev => !prev);
  }

  function calcPosition() {
    const position = calculatePositionByRef(ref);
    if (!position) return;
    setPosition(position);
  }

  return cloneElement(children as React.ReactElement, {
    id: selectTriggerId,
    className,
    onClick: handleTriggerClick,
    ref,
  });
};

const SelectList: FC<SelectListProps> = ({ children, className }) => {
  const { isOpen, setIsOpen, position, selectTriggerId } = useSelect();
  const { outsideClickRef } = useOutsideClick<HTMLUListElement>(close, true, [
    selectTriggerId,
  ]);

  UseWheelListener(close);

  function close() {
    setIsOpen(false);
  }

  if (!isOpen) return null;
  return createPortal(
    <ul
      style={{ ...position }}
      className={"fixed " + className}
      ref={outsideClickRef}
    >
      {children}
    </ul>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("root")!,
  );
};

const SelectItem: FC<SelectItemProps> = ({ value, children, className }) => {
  const { onChange, setIsOpen } = useSelect();

  function handleItemClick() {
    onChange(value);
    setIsOpen(false);
  }

  return (
    <li className={className} onClick={handleItemClick}>
      {children}
    </li>
  );
};

Select.SelectTrigger = SelectTrigger;
Select.SelectList = SelectList;
Select.SelectItem = SelectItem;
