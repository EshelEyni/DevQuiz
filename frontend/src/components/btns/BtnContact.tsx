import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function BtnContact() {
  const { language } = useSelector((state: RootState) => state.systemModule);
  return <button className={`btn-app-header ${language}`}>Contact Us</button>;
}
