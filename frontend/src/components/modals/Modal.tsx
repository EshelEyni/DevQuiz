import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../store/store";

type ModalProps = {
  children: React.ReactNode;
  onClickMainScreenFn: () => ThunkAction<Promise<void>, RootState, undefined, AnyAction>;
};
function Modal({ children, onClickMainScreenFn }: ModalProps) {
  const dispatch: AppDispatch = useDispatch();

  function handleMainScreenClick() {
    dispatch(onClickMainScreenFn());
  }
  return (
    <>
      <div className="main-screen dark" onClick={handleMainScreenClick}></div>
      <div className="modal">{children}</div>
    </>
  );
}

export default Modal;
