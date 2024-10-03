export function createRouter() {
  const routes = {
    '/': '/unauthenticated/landing-page.html',
    '/authenticated/destinations': '/authenticated/destinations.html',
    '/authenticated/trips': '/authenticated/trips.html',
    '/authenticated/new-destination': '/authenticated/new-destination.html',
    '/login': '/unauthenticated/auth/login.html',
    '/signup': '/unauthenticated/auth/signup.html'
  };

  async function loadContent(url) {
    const response = await fetch(url);

    return response.text();
  }

  async function handleRoute() {
    const path = window.location.pathname;

    const route = routes[path] || routes['/'];

    const content = await loadContent(route);

    const mainContent = document.getElementById('main-content');

    if (mainContent) {
      mainContent.innerHTML = content;
    } else {
      console.error('Main content element not found');
    }
  }

  function init() {
    window.addEventListener('popstate', handleRoute);

    document.body.addEventListener('click', (event) => {
      if (event.target.matches('a[href^="/"]')) {
        event.preventDefault();

        window.history.pushState({}, '', event.target.href);

        handleRoute();
      }
    });

    handleRoute();
  }

  return { init };
}
