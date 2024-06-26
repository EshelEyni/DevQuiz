import { FC, useRef } from "react";
import { uploadFileToCloudinary } from "../../services/cloudinaryService";
import { useJobApplication } from "../../hooks/useJobApplication";
import { AppDispatch } from "../../types/app.types";
import { useDispatch } from "react-redux";
import {
  setApplication,
  updateApplication,
} from "../../store/slices/jobApplicationSlice";
import { FaImage } from "react-icons/fa";
import { readAsDataURL } from "../../services/utils.service";

type ImgInputProps = {
  isEdit?: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ImgInput: FC<ImgInputProps> = ({ setIsLoading, isEdit }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const { application } = useJobApplication();

  const dispatch: AppDispatch = useDispatch();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!application) return;
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsLoading(true);

      const url = isEdit
        ? await readAsDataURL(file)
        : await uploadFileToCloudinary(file, "image");

      if (!url) return;

      const newApplication = {
        ...application,
        imgs: [...application.imgs, url],
      };

      if (isEdit) dispatch(setApplication(newApplication));
      else dispatch(updateApplication(newApplication));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      className="cursor-pointer text-4xl"
      onClick={() => {
        if (fileRef.current) fileRef.current.click();
      }}
    >
      <FaImage />
      <input
        type="file"
        accept={"image/*,video/*"}
        multiple={false}
        onChange={handleChange}
        className="hidden"
        ref={fileRef}
      />
    </button>
  );
};
