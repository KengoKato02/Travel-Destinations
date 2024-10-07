import { loadDestinations } from './components/authenticated/destinations/loadDestinations.js';

import { addDestinationForm } from './components/authenticated/destinations/addDestinations.js';

import { createNavbar } from './components/authenticated/navigation/navbar.js';

import './styles/tailwind.css';

const init = () => {
  const navbar = createNavbar();

  document.body.prepend(navbar);

  loadDestinations();

  const form = document.getElementById('destinationForm');

  if (form) {
    addDestinationForm();
  }
};

document.addEventListener('DOMContentLoaded', init);
