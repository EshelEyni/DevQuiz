import { FC } from "react";
import { useJobApplication } from "../../hooks/useJobApplication";
import { ContactDisplay } from "./ContactDisplay";
import { Button } from "../../components/Btns/Button";
import { AppDispatch } from "../../types/app.types";
import { useDispatch } from "react-redux";
import { updateApplication } from "../../store/slices/jobApplicationSlice";

export const ContactList: FC = () => {
  const { application } = useJobApplication();

  const dispatch: AppDispatch = useDispatch();

  function addContact() {
    if (!application) return;
    const defaultContact = {
      name: "name",
      url: "link",
      email: "email",
    };

    const newApplication = {
      ...application,
      contacts: [...application.contacts, defaultContact],
    };

    dispatch(updateApplication(newApplication));
  }

  if (!application) return null;
  const { contacts } = application;
  return (
    <div>
      <h3 className="mb-4 text-2xl  font-bold">Contacts</h3>
      <div className="flex w-full flex-wrap justify-center gap-2">
        {contacts.map((contact, index) => {
          return <ContactDisplay key={index} contact={contact} />;
        })}

        <Button
          onClickFn={addContact}
          className="flex h-20 items-center justify-center gap-2 self-center justify-self-start rounded-full bg-gray-600 px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
        >
          Add Contact
        </Button>
      </div>
    </div>
  );
};
