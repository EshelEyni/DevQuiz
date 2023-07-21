import { useIntersection } from "react-use";
import { FC, useState, useRef, useEffect } from "react";
import { Question as TypeOfQuestion } from "../../../../../shared/types/question";
import { QuestionPreview } from "../../Question/QuestionPreview/QuestionPreview";
import { getRandomBrightColor } from "../../../services/utils.service";
import "./ManagementEntityList.scss";
import { User } from "../../../../../shared/types/user";
import { UserPreview } from "../../User/UserPreview/UserPreview";

type ManagementEntityListProps = {
  entities: TypeOfQuestion[] | User[];
};
export const ManagementEntityList: FC<ManagementEntityListProps> = ({ entities }) => {
  const [paginationIdx, setPaginationIdx] = useState(1);
  const typeOfEntity = "question" in entities[0] ? "question" : "user";
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
      <ul className="management-list">
        {entities.slice(0, 40 * paginationIdx).map((entity, i) => {
          switch (typeOfEntity) {
            case "question":
              return (
                <QuestionPreview
                  key={entity.id}
                  question={entity as TypeOfQuestion}
                  bcgColor={getRandomBrightColor(i)}
                />
              );
            case "user":
              return <UserPreview key={entity.id} user={entity as User}  bcgColor={getRandomBrightColor(i)}/>;
          }
        })}
      </ul>
      <div ref={intersectionRef} style={{ width: "100%", height: "10rem" }} />
    </>
  );
};
