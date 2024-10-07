import { createRouter } from './router.js';

import { createNavbar } from './components/authenticated/navigation/navbar.js';

import './styles/tailwind.css';

document.addEventListener('DOMContentLoaded', async () => {
  const { body } = document;

  const mainContent = document.createElement('div');

  mainContent.id = 'main-content';

  body.appendChild(mainContent);

  const router = createRouter();

  router.init();

  if (window.location.pathname.startsWith('/authenticated')) {
    const navbar = createNavbar();

    body.prepend(navbar);
  }

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
  } else if (path.includes('login')) {
    const { initLogin } = await import(
      './components/unauthenticated/auth/login.js'
    );

    initLogin();
  } else if (path.includes('signup')) {
    const { initSignup } = await import(
      './components/unauthenticated/auth/signup.js'
    );

    initSignup();
  }
});
