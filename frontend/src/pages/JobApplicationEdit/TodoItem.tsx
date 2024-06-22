import { FC } from "react";
import { TodoItem as TodoItemType } from "../../../../shared/types/application";
import { JobApplicationField } from "./JobApplicationEditField";
import { FaCheck } from "react-icons/fa";
import { useJobApplication } from "../../hooks/useJobApplication";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import {
  setApplication,
  updateApplication,
} from "../../store/slices/jobApplicationSlice";
import { CheckBox } from "../../components/App/CheckBox";
import classnames from "classnames";

type TodoItemProps = {
  todoItem: TodoItemType;
};

export const TodoItem: FC<TodoItemProps> = ({ todoItem }) => {
  const { application } = useJobApplication();

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

  function handleSave() {
    if (!application) return;
    dispatch(updateApplication(application));
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl border p-3">
      <JobApplicationField>
        <JobApplicationField.DisplayElement className="flex items-center justify-between">
          <div>
            <div
              className={classnames("text-3xl text-white", {
                "line-through": todoItem.completed,
              })}
            >
              {todoItem.text || "Todo Item"}
            </div>
            <CheckBox
              handleClick={handleCheckBoxClick}
              isChecked={todoItem.completed}
            />
          </div>
        </JobApplicationField.DisplayElement>
        <div className="flex items-center gap-4">
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
            className="flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
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
