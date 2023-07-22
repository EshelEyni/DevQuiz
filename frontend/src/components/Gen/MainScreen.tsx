type MainScreenProps = {
  onClickFn: () => void;
  darkMode?: boolean;
};
export const MainScreen = ({ onClickFn, darkMode = false }: MainScreenProps) => {
  return <div className={`main-screen ${darkMode ? " dark" : ""}`} onClick={onClickFn}></div>;
};
