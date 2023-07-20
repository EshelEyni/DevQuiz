import { useIntersection } from "react-use";
import { FC, useState, useRef, useEffect } from "react";
import { Question as TypeOfQuestion } from "../../../../../shared/types/question";
import { QuestionPreview } from "../QuestionPreview/QuestionPreview";
import { getRandomBrightColor } from "../../../services/utils.service";
import "./QuestionList.scss";

type QuestionListProps = {
  questions: TypeOfQuestion[];
};
export const QuestionList: FC<QuestionListProps> = ({ questions }) => {
  const [paginationIdx, setPaginationIdx] = useState(1);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  useEffect(() => {
    if (intersection && intersection.intersectionRatio > 0.1) {
      setPaginationIdx(i => i + 1);
    }
  }, [intersection]);

  return (
    <>
      <ul className="question-list">
        {questions.slice(0, 40 * paginationIdx).map((question, i) => (
          <QuestionPreview
            key={question.id}
            question={question}
            bcColor={getRandomBrightColor(i)}
          />
        ))}
      </ul>
      <div ref={intersectionRef} style={{ width: "100%", height: "10rem" }} />
    </>
  );
};
