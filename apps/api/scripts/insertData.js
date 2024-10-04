import { connectToDatabase } from '../src/db/db.js';
import Destination from '../src/schemas/Destination.js';
import User from '../src/schemas/User.js';

import { generateDummyUsers, generateDummyDestinations } from './dummyData.js';

async function clearCollection(model) {
  await model.deleteMany({});
}

async function insertDummyData() {
  try {
    await connectToDatabase();

    await clearCollection(User);
    await clearCollection(Destination);

    await generateDummyUsers();
    await generateDummyDestinations();
  } catch (error) {
    console.error('Error in dummy data process:', error);
  } finally {
    process.exit(0);
  }
}

insertDummyData();
