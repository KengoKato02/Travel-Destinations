import { faker } from "@faker-js/faker";

import Destination from "../src/schemas/Destination.js";
import User from "../src/schemas/User.js";
import Trip from "../src/schemas/Trip.js";

faker.locale = "en";

const NUM_USERS = 5;
const NUM_DESTINATIONS = 10;
const NUM_TRIPS = 7;

export async function generateDummyUsers() {
  const users = [];

  for (let range = 0; range < NUM_USERS; range++) {
    users.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
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
      country: faker.location.country(),
    });
  }
  await Destination.insertMany(destinations);
}

export async function generateDummyTrips() {
  const users = await User.find();
  const destinations = await Destination.find();

  const trips = [];

  for (let range = 0; range < NUM_TRIPS; range++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const tripDestinations = [];
    const numberOfDestinations = Math.floor(Math.random() * 3) + 1;
    for (let startNumber = 0; i < numberOfDestinations; startNumber++) {
      const randomDestination =
        destinations[Math.floor(Math.random() * destinations.length)];
      tripDestinations.push(randomDestination._id);
    }

    trips.push({
      user_id: randomUser._id,
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      destinations: tripDestinations,
      start_date: faker.date.past(),
      end_date: faker.date.future(),
    });
  }

  await Trip.insertMany(trips);
}
