export type User = {
  id: string;
  username: string;
  password?: string;
  passwordConfirm?: string;
  email: string;
  isAdmin: boolean;
  createdAt: number;
};
