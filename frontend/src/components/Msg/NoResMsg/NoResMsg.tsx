type NoResMsgProps = {
  title: string;
};

export const NoResMsg = ({ title }: NoResMsgProps) => {
  return (
    <div className="msg-container">
      <h2 className="msg-no-result-found">
        No {title}s found.⚠️ Please try another search.
      </h2>
    </div>
  );
};
