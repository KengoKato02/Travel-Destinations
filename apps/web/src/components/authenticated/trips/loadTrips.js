import { fetchTrips } from '../../../utils/api.js';

export const loadTrips = async () => {
  const tripsList = document.getElementById('tripsList');

  if (!tripsList) {
    return;
  }

  try {
    const trips = await fetchTrips();

    tripsList.innerHTML = '';

    if (Array.isArray(trips) && trips.length > 0) {
      for (const trip of trips) {
        const listItem = document.createElement('li');

        listItem.className =
          'bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105';

        const title = document.createElement('h2');

        title.className = 'text-2xl font-bold text-blue-600 hover:underline';

        title.textContent = trip.title;

        listItem.appendChild(title);

        const destination = document.createElement('p');

        destination.className = 'text-gray-500 font-medium';

        destination.textContent = trip.destination;

        listItem.appendChild(destination);

        const description = document.createElement('p');

        description.className = 'mt-2 text-gray-700';

        description.textContent = trip.description;

        listItem.appendChild(description);

        tripsList.appendChild(listItem);
      }
    } else {
      tripsList.innerHTML = '<li>No trips found.</li>';
    }
  } catch (error) {
    console.error('Error fetching trips:', error);

    tripsList.innerHTML =
      '<li>Error loading trips. Please try again later.</li>';
  }
};
