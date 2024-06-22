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
import { BiEdit } from "react-icons/bi";

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

  return (
    <div className="flex w-full flex-col gap-3 rounded-3xl border p-3">
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
