export const createNavbar = () => {
  const nav = document.createElement('nav');

  nav.className = 'bg-white shadow';

  const container = document.createElement('div');

  container.className = 'mx-auto max-w-7xl px-2 sm:px-6 lg:px-8';

  const flexContainer = document.createElement('div');

  flexContainer.className = 'relative flex h-16 justify-between';

  // Navbar links
  const navLinksContainer = document.createElement('div');

  navLinksContainer.className =
    'flex flex-1 items-center justify-center sm:items-stretch sm:justify-start';

  const logoContainer = document.createElement('div');

  logoContainer.className = 'flex flex-shrink-0 items-center';

  const logoImg = document.createElement('img');

  logoImg.className = 'h-8 w-auto';

  logoImg.src =
    'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600';

  logoImg.alt = 'Your Company';

  logoContainer.appendChild(logoImg);

  navLinksContainer.appendChild(logoContainer);

  // Link items
  const links = [
    { href: 'trips', text: 'Your Trips' },
    { href: 'destinations', text: 'Destinations' },
    { href: 'new-destination', text: 'Add Destination' }
  ];

  const linksContainer = document.createElement('div');

  linksContainer.className = 'hidden sm:ml-6 sm:flex sm:space-x-8';

  for (const link of links) {
    const a = document.createElement('a');

    a.href = link.href;

    a.className =
      'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700';

    a.textContent = link.text;

    linksContainer.appendChild(a);
  }

  navLinksContainer.appendChild(linksContainer);

  flexContainer.appendChild(navLinksContainer);

  // User Profile Button
  const profileContainer = document.createElement('div');

  profileContainer.className =
    'absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0';

  const profileButton = document.createElement('button');

  profileButton.type = 'button';

  profileButton.className =
    'relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';

  const profileImg = document.createElement('img');

  profileImg.className = 'h-8 w-8 rounded-full';

  profileImg.src =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  profileButton.appendChild(profileImg);

  profileContainer.appendChild(profileButton);

  flexContainer.appendChild(profileContainer);

  container.appendChild(flexContainer);

  nav.appendChild(container);

  return nav;
};
