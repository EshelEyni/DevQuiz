export type User = {
  id: string;
  username: string;
  password?: string;
  passwordConfirm?: string;
  email: string;
  role: UserRoles[];
  createdAt: number;
};

export type UserRoles = "user" | "admin" | "supervisor";
