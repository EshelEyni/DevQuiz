export interface BasicUser {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

export interface User extends BasicUser {
  id: string;
  roles: UserRoles[];
  createdAt: number;
}

export type UserRoles = "user" | "admin" | "editor";

export interface UserCorrectAnswer {
  userId: string;
  questionId: string;
  language: string;
  level: string;
}
