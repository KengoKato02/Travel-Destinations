import { faker } from '@faker-js/faker';

import Destination from '../src/schemas/Destination.js';
import User from '../src/schemas/User.js';

faker.locale = 'en';

const NUM_USERS = 5;
const NUM_DESTINATIONS = 10;

export async function generateDummyUsers() {
  const users = [];

  for (let range = 0; range < NUM_USERS; range++) {
    users.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email()
    });
  }
  await User.insertMany(users);
}

export async function generateDummyDestinations() {
  const destinations = [];

  for (let range = 0; range < NUM_DESTINATIONS; range++) {
    destinations.push({
      title: faker.location.city(),
      description: faker.lorem.paragraph(),
      start_date: faker.date.past(),
      end_date: faker.date.future(),
      image_url: faker.image.url(),
      country: faker.location.country()
    });
  }
  await Destination.insertMany(destinations);
}
