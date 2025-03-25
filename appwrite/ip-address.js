import sdk, { Query } from "node-appwrite";
import { DATABASE_ID, COLLECTION_ID, databases } from "./index.js";

export const createAddress = async (data) => {
  try {
    console.log(data)
    const result = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      sdk.ID.unique(),
      data
    );
    return result;
  } catch (error) {
    console.error("There is something wrong when creating users");
    throw error;
  }
};

export const getAddresses = async () => {
  try {
    let allAddresses = [];
    const offset = 0;
    const limit = 100;

    while (true) {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID[(Query.limit(limit), Query.offset(offset))]
      );

      if (documents.length === 0) break;

      allAddresses = [...allAddresses, ...documents];

      offset += limit;
    }

    return allAddresses;
  } catch (error) {}
};
