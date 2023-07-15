type UserCredentials = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type LoginCredentials = Pick<UserCredentials, "username" | "password">;

export type { UserCredentials, LoginCredentials };
