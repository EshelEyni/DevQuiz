import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../store/store";

type ModalProps = {
  children: React.ReactNode;
  onClickMainScreenFn: () => ThunkAction<void, RootState, unknown, AnyAction> ;
  type?: string;
};
function Modal({ children, onClickMainScreenFn, type }: ModalProps) {
  const dispatch: AppDispatch = useDispatch();

  function handleMainScreenClick() {
    dispatch(onClickMainScreenFn());
  }
  return (
    <>
      <div className="main-screen dark" onClick={handleMainScreenClick}></div>
      <div className={`modal ${type}`}>{children}</div>
    </>
  );
}

export default Modal;
