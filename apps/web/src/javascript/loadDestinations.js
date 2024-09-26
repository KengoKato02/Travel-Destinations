import { fetchDestinations } from './api.js';

export async function loadDestinations() {
  try {
    const destinations = await fetchDestinations();
    const destinationsList = document.querySelector('.destinations');

    destinationsList.innerHTML = '';

    // Use for...of instead of forEach
    for (const destination of destinations) {
      const listItem = document.createElement('li');
      listItem.classList.add('destination');

      listItem.innerHTML = `
        <img src="${destination.image_url}" class="destination__image" alt="${destination.country}" />
        <div class="destination__content">
          <p class="destination__country">
            <img src="./icons/location-outline.svg" width="16" />
            ${destination.country}
          </p>
          <h2>${destination.title}</h2>
          <p class="destination__time">
            <time datetime="${destination.start_date}">${destination.start_date}</time>
            to
            <time datetime="${destination.end_date}">${destination.end_date}</time>
          </p>
          <p>${destination.description}</p>
        </div>
      `;

      destinationsList.appendChild(listItem);
    }
  } catch (error) {
    console.error('Error loading destinations:', error);
  }
}
