import { FC } from "react";

type ErrMsgProps = {
  msg?: string | null;
};

export const ErrMsg: FC<ErrMsgProps> = ({ msg = "" }) => {
  return <p className="text-3xl text-red-500 md:text-lg">{msg}</p>;
};
