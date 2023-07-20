import { FormEvent } from "react";
import { UserCredentials } from "../../types/auth.types";

type LoginFormProps = {
  userCredentials: UserCredentials;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleForm: () => void;
};

export const LoginForm = ({
  onToggleForm,
  userCredentials: { username, password },
  handleChange,
  handleSubmit,
}: LoginFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <span onClick={onToggleForm}>Sign up</span>
      </p>
    </form>
  );
};
