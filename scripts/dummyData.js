import { faker } from '@faker-js/faker';

faker.locale = 'en';

const NUM_USERS = 5;
const NUM_DESTINATIONS = 10;

export async function generateDummyUsers(db) {
  const userCollection = db.collection('User');
  const users = [];

  for (let range = 0; range < NUM_USERS; range++) {
    users.push({
      UserID: faker.string.uuid(),
      Username: faker.internet.userName(),
      Password: faker.internet.password(),
      Email: faker.internet.email()
    });
  }
  await userCollection.insertMany(users);
}

export async function generateDummyDestinations(db) {
  const destinationCollection = db.collection('Destination');
  const destinations = [];

  for (let range = 0; range < NUM_DESTINATIONS; range++) {
    destinations.push({
      DestinationID: faker.string.uuid(),
      Title: faker.location.city(),
      DateFrom: faker.date.past(),
      DateTo: faker.date.future(),
      Description: faker.lorem.paragraph(),
      PictureURL: faker.image.url(),
      Country: faker.location.country()
    });
  }
  await destinationCollection.insertMany(destinations);
}
