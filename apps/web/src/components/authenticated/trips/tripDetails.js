import { fetchTripById } from '../../../utils/api.js';

export const loadTripDetails = async (tripId) => {
  const tripDetailsContainer = document.getElementById('tripDetails');

  if (!tripDetailsContainer) {
    console.error('Trip details container not found');
    return;
  }

  try {
    const trip = await fetchTripById(tripId);
    
    const tripHTML = `
      <h2 class="text-2xl font-bold mb-4">${trip.title}</h2>
      <p class="mb-2">${trip.description}</p>
      <p class="mb-4"><strong>Date:</strong> ${new Date(trip.start_date).toLocaleDateString()} - ${new Date(trip.end_date).toLocaleDateString()}</p>
      <h3 class="text-xl font-semibold mb-2">Destinations:</h3>
      <ul class="list-disc pl-5">
        ${trip.destinations.map(dest => `
          <li class="mb-2">
            <h4 class="font-semibold">${dest.title}</h4>
            <p>${dest.description}</p>
          </li>
        `).join('')}
      </ul>
    `;

    tripDetailsContainer.innerHTML = tripHTML;
  } catch (error) {
    console.error('Error loading trip details:', error);
    tripDetailsContainer.innerHTML = '<p>Error loading trip details. Please try again later.</p>';
  }
};