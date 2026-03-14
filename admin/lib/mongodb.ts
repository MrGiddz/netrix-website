import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const MONGODB_DB = process.env.MONGODB_DB || "netrix";

declare global {
  var __netrixMongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(MONGODB_URI);
const clientPromise = global.__netrixMongoClientPromise || client.connect();

if (!global.__netrixMongoClientPromise) {
  global.__netrixMongoClientPromise = clientPromise;
}

export async function getMongoCollection(name: string) {
  const connectedClient = await clientPromise;
  return connectedClient.db(MONGODB_DB).collection(name);
}
