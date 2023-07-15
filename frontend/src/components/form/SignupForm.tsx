import { FormEvent } from "react";
import { UserCredentials } from "../../types/auth.types";

type SignupFormProps = {
  userCredentials: UserCredentials;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleForm: () => void;
};

function SignupForm({
  userCredentials: { username, email, password, passwordConfirm },
  handleChange,
  handleSubmit,
  onToggleForm,
}: SignupFormProps) {
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
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Email"
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
      <input
        type="password"
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Sign up</button>
      <p>
        Already have an account? <span onClick={onToggleForm}>Log in</span>
      </p>
    </form>
  );
}

export default SignupForm;
