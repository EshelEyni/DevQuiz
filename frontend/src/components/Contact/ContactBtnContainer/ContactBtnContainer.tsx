import { CheckBox } from "../../App/CheckBox/CheckBox";
import {
  BsEnvelope,
  BsEnvelopeOpen,
  BsTrash,
  BsTrashFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import { BtnMark } from "../../App/BtnMarkedAs/BtnMark";
import { ContactMessage } from "../../../../../shared/types/system";
import { BtnEntityArchive } from "../../Btns/BtnEntityArchive/BtnEntityArchive";
import "./ContactBtnContainer.scss";

type ContactBtnContainerProps = {
  contactMsg: ContactMessage;
  toggleMarkedAsRead: () => void;
  toggleMarkedAsDone: () => void;
  toggleMarkedAsSpam: () => void;
  toggleMarkedAsImportant: () => void;
  archiveContactMsg: () => void;
};

export const ContactBtnContainer = ({
  contactMsg,
  toggleMarkedAsDone,
  toggleMarkedAsRead,
  toggleMarkedAsSpam,
  toggleMarkedAsImportant,
  archiveContactMsg,
}: ContactBtnContainerProps) => {
  return (
    <div className="btn-container">
      <button className="btn-marked-as-done" onClick={toggleMarkedAsDone}>
        <CheckBox checked={contactMsg.markedAsDone} size={20} color="#495057" />
      </button>
      <BtnMark
        checked={contactMsg.markedAsRead}
        size={18}
        color="#495057"
        icons={{
          checked: <BsEnvelope />,
          unchecked: <BsEnvelopeOpen />,
        }}
        onClickFn={toggleMarkedAsRead}
      />
      <BtnMark
        checked={contactMsg.markedAsImportant}
        size={18}
        color="#495057"
        icons={{
          checked: <BsStarFill />,
          unchecked: <BsStar />,
        }}
        onClickFn={toggleMarkedAsImportant}
      />
      <BtnMark
        checked={contactMsg.markedAsSpam}
        size={16}
        color="#495057"
        icons={{
          checked: <BsTrashFill />,
          unchecked: <BsTrash />,
        }}
        onClickFn={toggleMarkedAsSpam}
      />

      <BtnEntityArchive
        entity="contact msg"
        color="#495057"
        handleBtnArchiveClick={archiveContactMsg}
      />
    </div>
  );
};
