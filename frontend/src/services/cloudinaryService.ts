import axios from "axios";

export const uploadFileToCloudinary = async (
  file: File,
  type: "image" | "video",
): Promise<string> => {
  const cloudName = "dng9sfzqt";
  const uploadPreset = "hoav12li";
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const { data } = await axios.post(uploadUrl, formData);
    return data.url;
  } catch (err) {
    console.error("ERROR!", err);
    return "";
  }
};
