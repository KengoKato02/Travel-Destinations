import { MongoClient } from 'mongodb';

let client;
let clientPromise;

export async function connectToDatabase() {
  if (!client) {
    const uri = process.env.MONGODB_URI;

    client = new MongoClient(uri, {
      useUnifiedTopology: true,
      minPoolSize: 5,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 50000
    });

    clientPromise = client.connect();
  }

  try {
    await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    console.log('Reusing MongoDB connection');
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}
