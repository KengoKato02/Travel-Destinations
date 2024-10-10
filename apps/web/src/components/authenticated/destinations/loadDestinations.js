import { fetchDestinations, deleteDestination } from '../../../utils/api.js';

import { getUserSession } from '../../../utils/auth.js';

import { openEditModal } from '../modals/editDestinationModal.js';

const createDestinationListItem = (destination, user) => {
  const listItem = document.createElement('li');

  listItem.className =
    'bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative';

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

  image.onerror = function () {
    this.src = 'path/to/default/image.jpg';
  };

  listItem.appendChild(image);

  if (user?.isAdmin) {
    addAdminControls(listItem, destination);
  }

  return listItem;
};

const addAdminControls = (listItem, destination) => {
  const editButton = document.createElement('button');

  editButton.className =
    'absolute top-4 right-12 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-300';

  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  editButton.setAttribute('aria-label', 'Edit destination');

  editButton.addEventListener('click', (event) => {
    event.stopPropagation();

    openEditModal(destination);
  });

  listItem.appendChild(editButton);

  const deleteButton = document.createElement('button');

  deleteButton.className =
    'absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-300';

  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

  deleteButton.setAttribute('aria-label', 'Delete destination');

  deleteButton.addEventListener('click', async (event) => {
    event.stopPropagation();

    if (confirm('Are you sure you want to delete this destination?')) {
      try {
        await deleteDestination(destination._id);

        listItem.remove();
      } catch (error) {
        console.error('Error deleting destination:', error);

        alert('Failed to delete destination. Please try again.');
      }
    }
  });

  listItem.appendChild(deleteButton);
};

export const loadDestinations = async () => {
  const destinationsList = document.getElementById('destinationsList');

  const user = getUserSession();

  if (!destinationsList) {
    return;
  }

  try {
    const destinations = await fetchDestinations();

    destinationsList.innerHTML = '';

    if (Array.isArray(destinations) && destinations.length > 0) {
      for (const destination of destinations) {
        const listItem = createDestinationListItem(destination, user);

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
