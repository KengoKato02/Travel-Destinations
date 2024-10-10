import { fetchTripById, fetchDestinations, addDestinationToTrip, removeDestinationFromTrip } from '../../../utils/api.js';

export const loadTripDetails = async (tripId) => {
  console.log('loadTripDetails called with ID:', tripId);
  const tripDetailsContainer = document.getElementById('tripDetails');

  if (!tripDetailsContainer) {
    console.error('Trip details container not found');
    console.log('Current HTML:', document.body.innerHTML);
    return;
  }

  try {
    const [trip, allDestinations] = await Promise.all([
      fetchTripById(tripId),
      fetchDestinations()
    ]);
    console.log('Fetched trip data:', trip);
    
    const tripHTML = `
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-3xl font-bold mb-4 text-indigo-600">${trip.title}</h2>
          <p class="text-gray-600 mb-4">${trip.description}</p>
          <p class="text-sm text-gray-500 mb-6">
            <span class="font-semibold">Date:</span> ${new Date(trip.start_date).toLocaleDateString()} - ${new Date(trip.end_date).toLocaleDateString()}
          </p>
          <h3 class="text-2xl font-semibold mb-4 text-indigo-500">Destinations:</h3>
          <div class="mb-4">
            <select id="destinationSelect" class="w-full p-2 border border-gray-300 rounded">
              <option value="">Select a destination to add</option>
              ${allDestinations
                .filter(dest => !trip.destinations.some(tripDest => tripDest._id === dest._id))
                .map(dest => `<option value="${dest._id}">${dest.title}</option>`)
                .join('')}
            </select>
            <button id="addDestinationBtn" class="mt-2 bg-green-500 text-white px-4 py-2 rounded">Add Destination</button>
          </div>
          <div class="space-y-6">
            ${trip.destinations.map(dest => `
              <div class="flex flex-col md:flex-row bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <img src="${dest.image_url}" alt="${dest.title}" class="w-full md:w-1/3 h-48 object-cover">
                <div class="p-4 md:w-2/3">
                  <h4 class="font-semibold text-lg mb-2">${dest.title}</h4>
                  <p class="text-sm text-gray-600 mb-2">${dest.description}</p>
                  <p class="text-xs text-gray-500">${dest.country}</p>
                  <button class="removeDestinationBtn bg-red-500 text-white px-2 py-1 rounded mt-2" data-destination-id="${dest._id}">Remove</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    tripDetailsContainer.innerHTML = tripHTML;

    // Add destination button
    const addDestinationBtn = document.getElementById('addDestinationBtn');
    addDestinationBtn.addEventListener('click', async () => {
      const select = document.getElementById('destinationSelect');
      const selectedDestinationId = select.value;
      if (selectedDestinationId) {
        try {
          await addDestinationToTrip(trip._id, selectedDestinationId);
          loadTripDetails(trip._id); // Reload the trip details
        } catch (error) {
          alert('Failed to add destination. Please try again.');
        }
      } else {
        alert('Please select a destination to add.');
      }
    });

    // Remove destination buttons
    const removeDestinationBtns = document.querySelectorAll('.removeDestinationBtn');
    removeDestinationBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        try {
          await removeDestinationFromTrip(trip._id, e.target.dataset.destinationId);
          loadTripDetails(trip._id); // Reload the trip details
        } catch (error) {
          alert('Failed to remove destination. Please try again.');
        }
      });
    });
  } catch (error) {
    console.error('Error loading trip details:', error);
    tripDetailsContainer.innerHTML = '<p class="text-red-500">Error loading trip details. Please try again later.</p>';
  }
};
