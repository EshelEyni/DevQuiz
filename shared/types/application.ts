export interface JobApplication {
  id: string;
  userId: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  url: string;
  notes: string;
  contacts: string[];
  company: string;
  position: string;
  todoList: TodoItem[];
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};
