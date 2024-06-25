import { FC, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Modal } from "../App/Modal";
import { BiArchiveIn } from "react-icons/bi";
import { useJobApplication } from "../../hooks/useJobApplication";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import {
  setApplication,
  updateApplication,
} from "../../store/slices/jobApplicationSlice";

type ImgDisplayProps = {
  src: string;
  isEdit?: boolean;
};

export const ImgDisplay: FC<ImgDisplayProps> = ({ src, isEdit }) => {
  const { application } = useJobApplication();
  const [isOpened, setIsOpened] = useState(false);
  const { outsideClickRef } = useOutsideClick<HTMLImageElement>(() =>
    setIsOpened(false),
  );

  const dispatch: AppDispatch = useDispatch();

  const className = `relative cursor-pointer ${
    isOpened ? "fixed inset-0 z-50" : "w-1/4 h-1/4"
  }`;

  function handleBtnRemoveClick() {
    if (!application) return;
    const newApplication = {
      ...application,
      imgs: application.imgs.filter(img => img !== src),
    };

    if (isEdit) dispatch(setApplication(newApplication));
    else dispatch(updateApplication(newApplication));
  }

  return (
    <div className={className}>
      <Modal>
        <Modal.OpenBtn
          modalName="archiveModal"
          className="absolute right-1 top-1 z-50 cursor-pointer"
        >
          <button>
            <BiArchiveIn className="text-3xl md:text-4xl" />
          </button>
        </Modal.OpenBtn>

        <Modal.Window
          name="archiveModal"
          className="fixed left-1/2 top-1/2 z-[1500] flex max-w-[320px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-lg bg-gray-600 p-8 text-gray-100 shadow-xl"
        >
          <h3 className="text-3xl font-semibold text-gray-200 md:text-3xl">
            Are you sure you want to remove this contact?
          </h3>

          <div className="mt-2 flex items-center gap-4">
            <Modal.CloseBtn className="rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105">
              <button>Cancel</button>
            </Modal.CloseBtn>
            <Modal.CloseBtn
              className="rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105"
              onClickFn={handleBtnRemoveClick}
            >
              <button>remove</button>
            </Modal.CloseBtn>
          </div>
        </Modal.Window>
      </Modal>
      <img
        src={src}
        alt="img"
        className="h-full w-full object-cover"
        onClick={() => setIsOpened(!isOpened)}
        ref={outsideClickRef}
      />
    </div>
  );
};
