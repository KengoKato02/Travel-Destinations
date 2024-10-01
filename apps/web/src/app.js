import { loadDestinations } from './components/destinations/loadDestinations.js';

import { addDestinationForm } from './components/destinations/addDestinations.js';

import { createNavbar } from './components/navigation/navbar.js';

import './styles/tailwind.css';

const init = () => {
  const navbar = createNavbar();

  document.body.prepend(navbar);

  loadDestinations();

  addDestinationForm();
};

document.addEventListener('DOMContentLoaded', init);
