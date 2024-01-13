import { ravenStore } from "../server";
import { IDocumentQuery } from "ravendb";
require("dotenv").config();

export interface QueryString {
  [key: string]: string | undefined;
  page?: string;
  sort?: string;
  limit?: string;
  fields?: string;
  searchTerm?: string;
  searchField?: string;
}

async function queryRavenDB(queryString: QueryString, collection: string): Promise<object[]> {
  const setFilter = (queryString: QueryString, query: IDocumentQuery<object>) => {
    const queryObj: QueryString = { ...queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "searchTerm", "searchField"];
    excludedFields.forEach(el => delete queryObj[el]);

    for (const key in queryObj) {
      if (queryObj[key] === undefined) continue;
      query = query.whereEquals(key, queryObj[key]);
    }
  };
  const { page, sort, limit } = queryString;
  const session = ravenStore.openSession();
  const query = session.query({ collection });

  if (page) query.skip(Number(page));
  if (limit) query.take(Number(limit));
  if (sort) query.orderBy(sort);

  setFilter(queryString, query);

  return await query.all();
}

function setIdToCollectionName(collectionName: string, id: string): string {
  return `${collectionName}/${id}`;
}

function trimCollectionNameFromId(id: string): string {
  return id.split("/")[1];
}

export { queryRavenDB, setIdToCollectionName, trimCollectionNameFromId };
