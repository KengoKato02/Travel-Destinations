import { fetchDestinations, deleteDestination } from '../../../utils/api.js';

import { getUserSession } from '../../../utils/auth.js';

import { openEditModal } from '../modals/editDestinationModal.js';

const createDestinationListItem = (destination, user) => {
  const template = document.getElementById('destinationTemplate');
  if (!template) {
    console.error('Destination template not found');
    return null;
  }

  const listItem = template.content.cloneNode(true).querySelector('li');
  if (!listItem) {
    console.error('List item not found in template');
    return null;
  }

  const title = listItem.querySelector('h2');
  if (title) title.textContent = destination.title;

  const country = listItem.querySelector('p:nth-of-type(1)');
  if (country) country.textContent = destination.country;

  const description = listItem.querySelector('p:nth-of-type(2)');
  if (description) description.textContent = destination.description;

  const image = listItem.querySelector('img');
  if (image) {
    image.src = destination.image_url;
    image.alt = destination.title;
    image.onerror = function () {
      this.src = '/path/to/default/image.jpg';
    };
  }

  if (user?.isAdmin) {
    const adminControls = listItem.querySelector('.admin-controls');
    if (adminControls) {
      adminControls.style.display = 'flex';

      const editButton = adminControls.querySelector('.edit-button');
      if (editButton) {
        editButton.addEventListener('click', (event) => {
          event.stopPropagation();
          openEditModal(destination);
        });
      }

      const deleteButton = adminControls.querySelector('.delete-button');
      if (deleteButton) {
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
      }
    }
  } else {
    const adminControls = listItem.querySelector('.admin-controls');
    if (adminControls) adminControls.remove();
  }
  return listItem;
};

export const loadDestinations = async () => {
  const destinationsList = document.getElementById('destinationsList');
  const user = getUserSession();

  if (!destinationsList) {
    console.error('Destinations list container not found');
    return;
  }

  try {
    const destinations = await fetchDestinations();
    destinationsList.innerHTML = '';

    if (Array.isArray(destinations) && destinations.length > 0) {
      destinations.forEach((destination) => {
        const listItem = createDestinationListItem(destination, user);
        if (listItem) {
          destinationsList.appendChild(listItem);
        } else {
          console.error('Failed to create list item for destination:', destination);
        }
      });
    } else {
      const noDestinationsMessage = document.createElement('li');
      noDestinationsMessage.textContent = 'No destinations found.';
      noDestinationsMessage.className = 'col-span-full text-center text-gray-500';
      destinationsList.appendChild(noDestinationsMessage);
    }
  } catch (error) {
    console.error('Error fetching destinations:', error);
    const errorMessage = document.createElement('li');
    errorMessage.textContent = 'Error loading destinations. Please try again later.';
    errorMessage.className = 'col-span-full text-center text-red-500';
    destinationsList.appendChild(errorMessage);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadDestinations();
});