import { MongoClient } from 'mongodb';

import { config } from './config';

const MONGODB_URI = config.isProduction
  ? config.mongodbAtlasUri
  : config.mongodbLocalUri;

let client;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db();
}
