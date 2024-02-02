import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useQuestionEditToast() {
  const [archiveCount, setArchiveCount] = useState(0);
  const [approveCount, setApproveCount] = useState(0);
  const [markCount, setMarkCount] = useState(0);

  useEffect(() => {
    if (archiveCount + approveCount + markCount === 0) return;
    toast(
      <div className="flex flex-col gap-2 bg-[#333] text-xl capitalize">
        {approveCount > 0 && <p>{approveCount} questions approved</p>}
        {markCount > 0 && <p>{markCount} questions marked</p>}
        {archiveCount > 0 && <p>{archiveCount} questions archived</p>}
      </div>,
      {
        style: {
          background: "#333",
          color: "#fff",
          fontSize: "13px",
          fontWeight: "600",
        },
        duration: 2000,
      },
    );
  }, [archiveCount, approveCount, markCount]);

  return { setArchiveCount, setApproveCount, setMarkCount };
}
