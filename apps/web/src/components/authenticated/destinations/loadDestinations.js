import { fetchDestinations, deleteDestination } from '../../../utils/api.js';
import { getUserSession } from '../../../utils/auth.js';

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
        const listItem = document.createElement('li');
        listItem.className = 'bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105';
        
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
        image.onerror = function() {
          this.src = 'path/to/default/image.jpg';
        };
        listItem.appendChild(image);

        if (user && user.isAdmin) {
          const deleteButton = document.createElement('button');
          deleteButton.className = 'mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600';
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', async (e) => {
            e.stopPropagation();
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
        }

        destinationsList.appendChild(listItem);
      }
    } else {
      destinationsList.innerHTML = '<li>No destinations found.</li>';
    }
  } catch (error) {
    console.error('Error fetching destinations:', error);
    destinationsList.innerHTML = '<li>Error loading destinations. Please try again later.</li>';
  }
};
