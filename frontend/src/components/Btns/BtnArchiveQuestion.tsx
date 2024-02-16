import { BiArchive } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { makeId } from "../../services/utils.service";
import { useRef } from "react";
import { Modal } from "../App/Modal";
import { Question, QuestionStatus } from "../../../../shared/types/question";
import { AppDispatch } from "../../types/app.types";
import { useDispatch } from "react-redux";
import { removeQuestion } from "../../store/slices/questionSlice";

type BtnArchiveQuestionProps = {
  question: Question;
  setQuestionStatus?: React.Dispatch<React.SetStateAction<QuestionStatus>>;
};

export const BtnArchiveQuestion = ({
  question,
  setQuestionStatus,
}: BtnArchiveQuestionProps) => {
  const dispatch: AppDispatch = useDispatch();
  const btnId = useRef(makeId()).current;

  function handleBtnArchiveClick() {
    dispatch(removeQuestion(question));
    if (setQuestionStatus) setQuestionStatus("archived");
  }

  return (
    <Modal>
      <Modal.OpenBtn modalName="archiveModal">
        <button
          data-tooltip-id={btnId}
          data-tooltip-content="Archive question"
          data-tooltip-place="top"
        >
          <BiArchive className="text-5xl md:text-4xl" />
        </button>
      </Modal.OpenBtn>
      <Tooltip
        id={btnId}
        style={{ fontSize: "16px" }}
        className="hidden md:block"
      />
      <Modal.Window
        name="archiveModal"
        className="fixed left-1/2 top-1/2 z-[150] flex min-w-[300px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12 overflow-auto rounded-lg bg-gray-800 p-8 shadow-lg"
      >
        <h3 className="text-center text-4xl font-semibold text-gray-200 md:text-3xl">
          Are you sure you want to archive this question?
        </h3>

        <div className="flex items-center gap-4">
          <Modal.CloseBtn className="rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105">
            <button>Cancel</button>
          </Modal.CloseBtn>
          <Modal.CloseBtn
            className="rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105"
            onClickFn={handleBtnArchiveClick}
          >
            <button>archive</button>
          </Modal.CloseBtn>
        </div>
      </Modal.Window>
    </Modal>
  );
};
