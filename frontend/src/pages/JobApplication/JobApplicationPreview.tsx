import { FC } from "react";
import { JobApplication } from "../../../../shared/types/application";
import { useNavigate } from "react-router-dom";
import { RiAlarmWarningFill } from "react-icons/ri";
import { Modal } from "../../components/App/Modal";
import { BiArchiveIn } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import { archiveApplication } from "../../store/slices/jobApplicationSlice";

type JobApplicationPreviewProps = {
  jobApplication: JobApplication;
};

export const JobApplicationPreview: FC<JobApplicationPreviewProps> = ({
  jobApplication,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const formattedDate = new Date(jobApplication.createdAt).toLocaleDateString(
    "he-IL",
  );

  const isWarningIconShown = jobApplication.todoList.some(
    todoItem => !todoItem.completed,
  );

  const navigate = useNavigate();

  function handleApplicationClick() {
    navigate(`/job-applications/${jobApplication.id}`);
  }

  function handleBtnRemoveClick() {
    dispatch(archiveApplication(jobApplication));
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-2 py-4 text-3xl md:px-4 md:text-3xl">
      <div
        className="flex w-9/12 cursor-pointer items-center gap-1"
        onClick={handleApplicationClick}
      >
        {isWarningIconShown && <RiAlarmWarningFill className="warning-icon" />}
        <p className="flex items-center gap-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="font-semibold text-gray-800">
            {jobApplication.company}
          </span>
          <span>-</span>
          <span>{jobApplication.position}</span>
          <span className="hidden sm:inline">-</span>
          <span className="hidden sm:inline">{jobApplication.status}</span>
          <span className="hidden md:inline">-</span>
          <span className="hidden md:inline">{formattedDate}</span>
        </p>
      </div>
      <div className="flex w-3/12 items-center justify-end gap-2 md:gap-4 md:text-2xl">
        {jobApplication.url && (
          <a
            href={jobApplication.url}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-2"
          >
            <button
              className="hidden items-center justify-center rounded-full bg-gray-600 px-4 py-2 text-gray-100 transition-all duration-300 hover:scale-110 hover:bg-gray-800 sm:flex md:px-6"
              type="button"
            >
              Link
            </button>
          </a>
        )}
        <Modal>
          <Modal.OpenBtn modalName="archiveModal">
            <button>
              <BiArchiveIn className="text-5xl md:text-6xl" />
            </button>
          </Modal.OpenBtn>

          <Modal.Window
            name="archiveModal"
            className="fixed left-1/2 top-1/2 z-[1500] flex max-w-[320px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-lg bg-gray-600 p-8 text-gray-100 shadow-xl"
          >
            <h3 className="text-3xl font-semibold text-gray-200 md:text-3xl">
              Are you sure you want to remove this application?
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
      </div>
    </div>
  );
};
