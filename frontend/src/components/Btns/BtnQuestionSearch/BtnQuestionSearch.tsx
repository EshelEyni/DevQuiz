import "./BtnQuestionSearch.scss"

type BtnQuestionSearchProps = {
  handleBtnSearchClick: () => void;
};

export const BtnQuestionSearch = ({ handleBtnSearchClick }: BtnQuestionSearchProps) => {
  return (
    <button className="btn-question-search" onClick={handleBtnSearchClick}>
      Search
    </button>
  );
};
