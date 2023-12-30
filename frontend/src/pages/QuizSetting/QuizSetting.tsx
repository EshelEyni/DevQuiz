import { useNavigate } from "react-router-dom";
import { QuizSettingForm } from "../../components/Form/QuizSettingForm/QuizSettingForm";
import { MainScreen } from "../../components/Gen/MainScreen";

export const QuizSetting = () => {
  const navigate = useNavigate();

  function onGoBack() {
    navigate(-1);
  }

  return (
    <>
      <MainScreen onClickFn={onGoBack} darkMode={true} />

      <main
        className="fixed left-1/2 top-1/2 z-[1000] flex h-[75vh] min-h-min w-[50vw] -translate-x-1/2 -translate-y-1/2
 flex-col items-center justify-center rounded-xl bg-indigo-300"
      >
        <QuizSettingForm />
      </main>
    </>
  );
};
