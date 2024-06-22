import { FC } from "react";
import { useJobApplication } from "../../hooks/useJobApplication";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import { Button } from "../../components/Btns/Button";
import { TodoItem } from "./TodoItem";
import { updateApplication } from "../../store/slices/jobApplicationSlice";
import { TodoItem as TodoItemType } from "../../../../shared/types/application";
import { makeId } from "../../services/utils.service";

export const TodoList: FC = () => {
  const { application } = useJobApplication();

  const dispatch: AppDispatch = useDispatch();
  if (!application) return null;

  function addTodoItem() {
    if (!application) return;
    const defaultTodo: TodoItemType = {
      text: "Todo Item",
      completed: false,
      id: makeId(),
    };

    const newApplication = {
      ...application,
      todoList: [...application.todoList, defaultTodo],
    };

    dispatch(updateApplication(newApplication));
  }

  const { todoList } = application;
  return (
    <div>
      <h3 className="mb-4 text-2xl  font-bold">Todo List</h3>
      <div className="flex w-full flex-wrap justify-center gap-2">
        {todoList.map((todo, index) => {
          return <TodoItem key={index} todoItem={todo} />;
        })}

        <Button
          onClickFn={addTodoItem}
          className="flex h-20 items-center justify-center gap-2 self-center justify-self-start rounded-full bg-gray-600 px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
        >
          <span>Add Todo</span>
        </Button>
      </div>
    </div>
  );
};
