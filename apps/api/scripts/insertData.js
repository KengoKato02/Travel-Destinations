import { connectToDatabase } from '../src/db/db.js';

import { generateDummyUsers, generateDummyDestinations } from './dummyData.js';

async function clearCollection(db, collectionName) {
  const collection = db.collection(collectionName);
  await collection.deleteMany({});
}

async function insertDummyData() {
  try {
    const db = await connectToDatabase();

    await clearCollection(db, 'User');
    await clearCollection(db, 'Destination');

    await generateDummyUsers(db);
    await generateDummyDestinations(db);
  } catch (error) {
    console.error('Error in dummy data process:', error);
  } finally {
    process.exit(0);
  }
}

insertDummyData();
