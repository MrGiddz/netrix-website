import { MongoClient } from "mongodb";

declare global {
  var __netrixMongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoClientPromise() {
  if (!global.__netrixMongoClientPromise) {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    global.__netrixMongoClientPromise = new MongoClient(uri).connect();
  }

  return global.__netrixMongoClientPromise;
}

export async function getMongoCollection(name: string) {
  const connectedClient = await getMongoClientPromise();
  return connectedClient.db(process.env.MONGODB_DB || "netrix").collection(name);
}
