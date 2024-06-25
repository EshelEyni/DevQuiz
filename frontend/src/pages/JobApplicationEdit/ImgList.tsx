import { useState } from "react";
import { useJobApplication } from "../../hooks/useJobApplication";
import { ImgInput } from "./ImgInput";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { ImgDisplay } from "./ImgDisplay";

export const ImgList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { application } = useJobApplication();

  if (!application) return null;
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2">
        <span className="text-2xl font-bold">Images</span>
        <ImgInput setIsLoading={setIsLoading} />
      </h3>

      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex w-full flex-wrap gap-2">
          {application.imgs.map((img, index) => {
            return <ImgDisplay key={index} src={img} />;
          })}
        </div>
      )}
    </div>
  );
};
