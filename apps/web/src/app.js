import { createRouter } from './router.js';

import { createNavbar } from './components/authenticated/navigation/navbar.js';

import './styles/tailwind.css';

document.addEventListener('DOMContentLoaded', async () => {
  const { body } = document;

  // Create and append the main content container
  const mainContent = document.createElement('div');

  mainContent.id = 'main-content';

  body.appendChild(mainContent);

  // Initialize the router
  const router = createRouter();

  router.init();

  // Check if the current route is an authenticated route
  if (window.location.pathname.startsWith('/authenticated')) {
    // Create and append the navbar
    const navbar = createNavbar();

    body.prepend(navbar);
  }

  // Determine the current page and load the appropriate script
  const path = window.location.pathname;

  if (path.includes('destinations')) {
    const { loadDestinations } = await import(
      './components/authenticated/destinations/loadDestinations.js'
    );

    loadDestinations();
  } else if (path.includes('new-destination')) {
    const { addDestinationForm } = await import(
      './components/authenticated/destinations/addDestinations.js'
    );

    addDestinationForm();
  }
  // Add more conditions for other pages as needed
});
