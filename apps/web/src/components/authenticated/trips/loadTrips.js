import { fetchTrips, deleteTrip } from '../../../utils/api.js';
import { getUserSession } from '../../../utils/auth.js';
import { openEditTripModal } from '../modals/editTripModal.js';

export const loadTrips = async () => {
  const tripsList = document.getElementById('tripsList');

  if (!tripsList) {
    return;
  }

  try {
    const trips = await fetchTrips();
    tripsList.innerHTML = '';

    if (Array.isArray(trips) && trips.length > 0) {
      trips.forEach((trip) => {
        const listItem = createTripListItem(trip);
        tripsList.appendChild(listItem);
      });
    } else {
      tripsList.innerHTML = '<li>No trips found.</li>';
    }
  } catch (error) {
    console.error('Error fetching trips:', error);
    tripsList.innerHTML =
      '<li>Error loading trips. Please try again later.</li>';
  }
};

const createTripListItem = (trip) => {
  const listItem = document.createElement('li');
  listItem.className =
    'relative bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer';

  const headerContainer = createHeaderContainer(trip);
  listItem.appendChild(headerContainer);

  const destination = document.createElement('p');
  destination.className = 'text-gray-500 font-medium';
  destination.textContent = `Destinations: ${trip.destinations.length}`;
  listItem.appendChild(destination);

  const description = document.createElement('p');
  description.className = 'mt-2 text-gray-700';
  description.textContent = trip.description;
  listItem.appendChild(description);

  listItem.addEventListener('click', () => {
    window.location.href = `/authenticated/trips/${trip._id}`;
  });

  return listItem;
};

const createHeaderContainer = (trip) => {
  const headerContainer = document.createElement('div');
  headerContainer.className = 'flex justify-between items-center';

  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold text-blue-600 hover:underline';
  title.style.maxWidth = 'calc(100% - 60px)';
  title.textContent = trip.title;
  headerContainer.appendChild(title);

  const buttonContainer = createButtonContainer(trip);
  headerContainer.appendChild(buttonContainer);

  return headerContainer;
};

const createButtonContainer = (trip) => {
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'flex items-center space-x-2';

  const editButton = document.createElement('button');
  editButton.className =
    'p-2 text-gray-500 hover:text-gray-700 transition-colors duration-300';
  editButton.innerHTML = '<i class="fa-solid fa-edit"></i>';
  editButton.setAttribute('aria-label', 'Edit trip');
  editButton.addEventListener('click', (event) => {
    event.stopPropagation();
    openEditTripModal(trip);
  });
  buttonContainer.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.className =
    'p-2 text-gray-500 hover:text-gray-700 transition-colors duration-300';
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.setAttribute('aria-label', 'Delete trip');
  deleteButton.addEventListener('click', async (event) => {
    event.stopPropagation();
    try {
      await deleteTrip(trip._id);
      listItem.remove();
    } catch (error) {
      alert('Failed to delete trip. Please try again.');
    }
  });

  buttonContainer.appendChild(deleteButton);

  return buttonContainer;
};
