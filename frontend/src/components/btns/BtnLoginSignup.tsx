import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function BtnLoginSignup() {
  const { language } = useSelector((state: RootState) => state.systemModule);
  return <button className={`btn-app-header ${language}`}>Login</button>;
}
