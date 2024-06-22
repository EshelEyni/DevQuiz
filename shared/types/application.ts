export interface JobApplication {
  id: string;
  userId: string;
  company: string;
  position: string;
  status: string;
  url: string;
  notes: string;
  contacts: Contact[];
  todoList: TodoItem[];
  createdAt: Date | string;
  updatedAt: Date | string;
  isArchived: boolean;
}

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

export type Contact = {
  name: string;
  url: string;
  email: string;
}