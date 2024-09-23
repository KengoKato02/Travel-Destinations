import { MongoClient } from 'mongodb';

// eslint-disable-next-line import-x/extensions
import { config } from './config.js';

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
