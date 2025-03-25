import sdk from "node-appwrite";

const client = new sdk.Client();

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

export const databases = new sdk.Databases(client);

export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
export const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID;