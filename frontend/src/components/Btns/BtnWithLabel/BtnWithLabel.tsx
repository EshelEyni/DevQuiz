import React from "react";

type BtnWithLabelProps = {
  label: string;
  onClickFunc: () => void;
  children: React.ReactNode;
};

export const BtnWithLabel = ({
  label,
  onClickFunc,
  children,
}: BtnWithLabelProps) => {
  return (
    <div className="flex flex-col items-center justify-center whitespace-nowrap p-2.5">
      <label htmlFor="btn-get-duplicates" className="text-2xl font-semibold">
        {label}
      </label>
      <button id="btn-get-duplicates" onClick={onClickFunc}>
        {children}
      </button>
    </div>
  );
};
