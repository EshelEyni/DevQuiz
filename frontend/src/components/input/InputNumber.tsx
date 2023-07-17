import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AppDispatch } from "../../store/types";
import { setSecondsPerQuestion } from "../../store/actions/system.actions";

export const InputNumber = () => {
  const dispatch: AppDispatch = useDispatch();
  const { secondsPerQuestion } = useSelector((state: RootState) => state.systemModule);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const secondsPerQuestion = e.target.value;
    dispatch(setSecondsPerQuestion(Number(secondsPerQuestion)));
  }
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type="number"
          className="input-number"
          name="secondsPerQuestion"
          min={0}
          max={90}
          value={secondsPerQuestion}
          onChange={handleChange}
        />
        <label htmlFor="secondsPerQuestion">*Seconds Per Question</label>
      </div>
    </div>
  );
};
