import { MongoClient } from 'mongodb';

let db;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useUnifiedTopology: true
  });

  if (!db) {
    try {
      await client.connect();
      db = client.db(process.env.MONGODB_DB_NAME);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  return db;
}
