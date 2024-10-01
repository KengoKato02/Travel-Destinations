import { fetchDestinations } from '../../../utils/api.js';

export const loadDestinations = async () => {
  const destinationsList = document.getElementById('destinationsList');

  if (!destinationsList) {
    return;
  }

  try {
    const destinations = await fetchDestinations();

    destinationsList.innerHTML = '';

    if (Array.isArray(destinations) && destinations.length > 0) {
      for (const destination of destinations) {
        const listItem = document.createElement('li');

        listItem.className =
          'bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105';

        const title = document.createElement('h2');

        title.className = 'text-2xl font-bold text-blue-600 hover:underline';

        title.textContent = destination.title;

        listItem.appendChild(title);

        const country = document.createElement('p');

        country.className = 'text-gray-500 font-medium';

        country.textContent = destination.country;

        listItem.appendChild(country);

        const description = document.createElement('p');

        description.className = 'mt-2 text-gray-700';

        description.textContent = destination.description;

        listItem.appendChild(description);

        const image = document.createElement('img');

        image.src = destination.image_url;

        image.alt = destination.title;

        image.className = 'mt-4 w-full h-96 object-cover rounded-lg shadow-md';

        listItem.appendChild(image);

        destinationsList.appendChild(listItem);
      }
    } else {
      destinationsList.innerHTML = '<li>No destinations found.</li>';
    }
  } catch (error) {
    console.error('Error fetching destinations:', error);

    destinationsList.innerHTML =
      '<li>Error loading destinations. Please try again later.</li>';
  }
};
