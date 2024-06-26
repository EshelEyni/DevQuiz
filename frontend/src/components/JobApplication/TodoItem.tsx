import { FC } from "react";
import { TodoItem as TodoItemType } from "../../../../shared/types/application";
import { JobApplicationField } from "../../pages/JobApplicationDetails/JobApplicationField";
import { FaCheck } from "react-icons/fa";
import { useJobApplication } from "../../hooks/useJobApplication";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import {
  setApplication,
  updateApplication,
} from "../../store/slices/jobApplicationSlice";
import { CheckBox } from "../App/CheckBox";
import classnames from "classnames";
import { Modal } from "../App/Modal";
import { BiArchiveIn } from "react-icons/bi";

type TodoItemProps = {
  todoItem: TodoItemType;
};

export const TodoItem: FC<TodoItemProps> = ({ todoItem }) => {
  const { application } = useJobApplication();
  const formattedDate = new Date(todoItem.createdAt).toLocaleDateString(
    "he-IL",
  );
  const dispatch: AppDispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!application) return;
    const name = e.target.name;
    const value = e.target.value;

    const newApplication = {
      ...application,
      todoList: application.todoList.map(todo =>
        todo.id === todoItem.id ? { ...todo, [name]: value } : todo,
      ),
    };

    dispatch(setApplication(newApplication));
  }

  function handleCheckBoxClick() {
    if (!application) return;
    const newApplication = {
      ...application,
      todoList: application.todoList.map(todo =>
        todo.id === todoItem.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    };

    dispatch(updateApplication(newApplication));
  }

  function handleBtnRemoveClick() {
    if (!application) return;
    const newApplication = {
      ...application,
      todoList: application.todoList.filter(todo => todo.id !== todoItem.id),
    };

    dispatch(updateApplication(newApplication));
  }

  function handleSave() {
    if (!application) return;
    dispatch(updateApplication(application));
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl border p-3">
      <JobApplicationField>
        <JobApplicationField.DisplayElement className="items-center flex justify-between">
          <div>
            <div
              className={classnames(
                "flex -items-center gap-1 text-3xl text-white",
                {
                  "line-through": todoItem.completed,
                },
              )}
            >
              <span>{todoItem.text || "Todo Item"}</span>
              <span>-</span>
              <span>{formattedDate}</span>
            </div>
            <div className="items-center flex gap-1">
              <CheckBox
                handleClick={handleCheckBoxClick}
                isChecked={todoItem.completed}
              />
              <Modal>
                <Modal.OpenBtn modalName="archiveModal">
                  <button>
                    <BiArchiveIn className="text-4xl" />
                  </button>
                </Modal.OpenBtn>

                <Modal.Window
                  name="archiveModal"
                  className="items-center fixed left-1/2 top-1/2 z-[1500] flex max-w-[320px] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg bg-gray-600 p-8 text-gray-100 shadow-xl"
                >
                  <h3 className="text-3xl font-semibold text-gray-200 md:text-3xl">
                    Are you sure you want to remove this item?
                  </h3>

                  <div className="items-center mt-2 flex gap-4">
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
        </JobApplicationField.DisplayElement>
        <div className="items-center flex gap-4">
          <JobApplicationField.EditElement
            onChange={handleChange}
            className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
          >
            <input
              type="text"
              defaultValue={todoItem.text}
              name="text"
              placeholder="Todo Item"
            />
          </JobApplicationField.EditElement>
          <JobApplicationField.SaveButton
            onSubmit={handleSave}
            className="items-center flex justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
          >
            <div>
              <FaCheck />
            </div>
          </JobApplicationField.SaveButton>
        </div>
      </JobApplicationField>
    </div>
  );
};
