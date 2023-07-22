import { ContactMessage, RavenDbDocument } from "../../../../shared/types/system";
import { ravenStore } from "../../server";
import { AppError } from "../../services/error.service";
import {
  QueryString,
  queryRavenDB,
  setIdToCollectionName,
  trimCollectionNameFromId,
} from "../../services/util.service";

const COLLECTION_NAME = "Contacts";

async function query(queryString: QueryString) {
  const contacts = (await queryRavenDB(
    queryString,
    COLLECTION_NAME
  )) as unknown as ContactMessage[];
  for (const contact of contacts) {
    contact.id = trimCollectionNameFromId(contact.id);
  }
  return contacts;
}

async function getById(contactId: string) {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, contactId);
  const contact = await session.load<ContactMessage>(id);
  if (!contact) throw new Error("Contact not found");
  contact.id = trimCollectionNameFromId(contact.id);
  return contact;
}

async function add(contactToAdd: any): Promise<any> {
  const session = ravenStore.openSession();
  const doc = { ...contactToAdd, ..._getDefaultValueForContact() } as any & RavenDbDocument;
  doc["@metadata"] = { "@collection": COLLECTION_NAME };
  await session.store(doc, COLLECTION_NAME + "/");
  await session.saveChanges();
  doc.id = trimCollectionNameFromId(doc.id);
  return doc;
}

async function update(contact: any) {
  const session = ravenStore.openSession();
  const id = setIdToCollectionName(COLLECTION_NAME, contact.id);
  const doc = await session.load<any>(id);
  if (!doc) throw new AppError("Contact not found", 404);
  Object.assign(doc, contact);
  await session.saveChanges();
  const updatedContact = {
    ...doc,
    id: trimCollectionNameFromId(doc.id),
  };
  return updatedContact;
}

async function remove(contactId: string) {
  const id = setIdToCollectionName(COLLECTION_NAME, contactId);
  const session = ravenStore.openSession();
  await session.delete(id);
  await session.saveChanges();
}

function _getDefaultValueForContact() {
  return {
    markedAsRead: false,
    markedAsSpam: false,
    markedAsDone: false,
    markedAsImportant: false,
    isArchived: false,
    updatedAt: new Date(),
    createdAt: new Date(),
  };
}

export default {
  query,
  getById,
  add,
  update,
  remove,
};
