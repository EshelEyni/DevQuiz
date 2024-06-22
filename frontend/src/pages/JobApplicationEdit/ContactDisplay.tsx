import { FC } from "react";
import { Contact } from "../../../../shared/types/application";
import { JobApplicationField } from "./JobApplicationEditField";
import { useDispatch } from "react-redux";
import { useJobApplication } from "../../hooks/useJobApplication";
import { AppDispatch } from "../../types/app.types";
import {
  setApplication,
  updateApplication,
} from "../../store/slices/jobApplicationSlice";
import { FaCheck } from "react-icons/fa";
import { BiArchiveIn, BiEdit } from "react-icons/bi";
import { Modal } from "../../components/App/Modal";

type ContactDisplayProps = {
  contact: Contact;
};

export const ContactDisplay: FC<ContactDisplayProps> = ({ contact }) => {
  const { application } = useJobApplication();

  const dispatch: AppDispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!application) return;
    const name = e.target.name;
    const value = e.target.value;

    const newApplication = {
      ...application,
      contacts: application.contacts.map(c =>
        c.name === contact.name ? { ...c, [name]: value } : c,
      ),
    };

    dispatch(setApplication(newApplication));
  }

  function handleSave() {
    if (!application) return;
    dispatch(updateApplication(application));
  }

  function handleBtnRemoveClick() {
    if (!application) return;
    const newApplication = {
      ...application,
      contacts: application.contacts.filter(c => c.name !== contact.name),
    };

    dispatch(updateApplication(newApplication));
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl border p-3">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-bold">Contact</h3>
        <Modal>
          <Modal.OpenBtn modalName="archiveModal">
            <button>
              <BiArchiveIn className="text-3xl md:text-4xl" />
            </button>
          </Modal.OpenBtn>

          <Modal.Window
            name="archiveModal"
            className="fixed left-1/2 top-1/2 z-[1500] flex max-w-[320px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-lg bg-gray-600 p-8 text-gray-100 shadow-xl"
          >
            <h3 className="text-3xl font-semibold text-gray-200 md:text-3xl">
              Are you sure you want to remove this contact?
            </h3>

            <div className="mt-2 flex items-center gap-4">
              <Modal.CloseBtn className="rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105">
                <button>Cancel</button>
              </Modal.CloseBtn>
              <Modal.CloseBtn
                className="rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105"
                onClickFn={handleBtnRemoveClick}
              >
                <button>remove</button>
              </Modal.CloseBtn>
            </div>
          </Modal.Window>
        </Modal>
      </div>
      <JobApplicationField>
        <JobApplicationField.DisplayElement className="text-3xl text-white">
          <div>{contact.name || "Name"}</div>
        </JobApplicationField.DisplayElement>
        <div className="flex items-center gap-4">
          <JobApplicationField.EditElement
            onChange={handleChange}
            className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
          >
            <input type="text" defaultValue={contact.name} name="name" />
          </JobApplicationField.EditElement>
          <JobApplicationField.SaveButton
            onSubmit={handleSave}
            className="flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
          >
            <div>
              <FaCheck />
            </div>
          </JobApplicationField.SaveButton>
        </div>
      </JobApplicationField>
      <JobApplicationField>
        <JobApplicationField.DisplayElement className="text-3xl text-white">
          <div>{contact.email || "Email"}</div>
        </JobApplicationField.DisplayElement>
        <div className="flex items-center gap-4">
          <JobApplicationField.EditElement
            onChange={handleChange}
            className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
          >
            <input
              type="text"
              defaultValue={contact.email}
              name="email"
              placeholder="Email"
            />
          </JobApplicationField.EditElement>
          <JobApplicationField.SaveButton
            onSubmit={handleSave}
            className="flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
          >
            <div>
              <FaCheck />
            </div>
          </JobApplicationField.SaveButton>
        </div>
      </JobApplicationField>
      <JobApplicationField>
        <div className="flex flex-wrap items-center gap-4">
          <JobApplicationField.DisplayElement className="overflow-hidden text-3xl text-blue-400 hover:underline">
            <a href={contact.url} target="_blank" rel="noreferrer">
              {contact.url || "Link"}
            </a>
          </JobApplicationField.DisplayElement>
          <JobApplicationField.EditButton className="cursor-pointer text-4xl">
            <div>
              <BiEdit />
            </div>
          </JobApplicationField.EditButton>
        </div>
        <div className="flex items-center gap-4">
          <JobApplicationField.EditElement
            onChange={handleChange}
            className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
          >
            <input
              type="text"
              defaultValue={contact.url}
              name="url"
              placeholder="Link"
            />
          </JobApplicationField.EditElement>
          <JobApplicationField.SaveButton
            onSubmit={handleSave}
            className="flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
          >
            <div>
              <FaCheck />
            </div>
          </JobApplicationField.SaveButton>
        </div>
      </JobApplicationField>
    </div>
  );
};
