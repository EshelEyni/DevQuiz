import { FC, useState } from "react";
import { useJobApplication } from "../../hooks/useJobApplication";
import { ImgInput } from "./ImgInput";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { ImgDisplay } from "./ImgDisplay";

type ImgListProps = {
  isEdit?: boolean;
};

export const ImgList: FC<ImgListProps> = ({ isEdit = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { application } = useJobApplication();

  if (!application) return null;
  return (
    <div>
      <h3 className="mb-4 flex w-full items-center justify-between gap-2">
        <span className="text-3xl font-bold text-white underline">Images</span>
        <ImgInput setIsLoading={setIsLoading} isEdit={isEdit} />
      </h3>

      {isLoading && <Loader />}
      {!isLoading && (
        <div className="relative flex w-full flex-wrap">
          {application.imgs.map((img, index) => {
            return <ImgDisplay key={index} src={img} isEdit={isEdit} />;
          })}
        </div>
      )}
    </div>
  );
};
