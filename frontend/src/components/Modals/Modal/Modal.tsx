import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/types";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../../store/store";
import "./Modal.scss";
import { MainScreen } from "../../Gen/MainScreen";

type ModalProps = {
  children: React.ReactNode;
  onClickMainScreenFn: () => ThunkAction<Promise<void>, RootState, undefined, AnyAction>;
  type?: string;
};

export const Modal = ({ children, onClickMainScreenFn, type }: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();

  function handleMainScreenClick() {
    dispatch(onClickMainScreenFn());
  }
  return (
    <>
      <MainScreen onClickFn={handleMainScreenClick} darkMode={true} />
      <div className={`modal ${type}`}>{children}</div>
    </>
  );
};
