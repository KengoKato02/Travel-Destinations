import { isAuthenticated } from "./utils/auth.js";

export function createRouter() {
  const routes = {
    "/": {
      template: "/unauthenticated/landing-page.html",
      init: null, // No specific initialization needed for landing page
    },
    "/authenticated/destinations": {
      template: "/authenticated/destinations.html",
      init: async () => {
        const m = await import(
          "./components/authenticated/destinations/loadDestinations.js"
        );

        return m.loadDestinations();
      },
    },
    '/authenticated/trips': {
      template: '/authenticated/trips.html',
      init: async () => {
        const m = await import('./components/authenticated/trips/loadTrips.js');

        return m.loadTrips();
      }
    },
    "/authenticated/new-destination": {
      template: "/authenticated/new-destination.html",
      init: async () => {
        const m = await import(
          "./components/authenticated/destinations/addDestinations.js"
        );

        return m.addDestinationForm();
      },
    },
    '/authenticated/trips/:id': {
      template: '/authenticated/trip-details.html',
      init: async (params) => {
        const m = await import('./components/authenticated/trips/tripDetails.js');
        return m.loadTripDetails(params.id);
      }
    },
    "/login": {
      template: "/unauthenticated/auth/login.html",
      init: async () => {
        const m = await import("./components/unauthenticated/auth/login.js");

        return m.initLogin();
      },
    },
    "/signup": {
      template: "/unauthenticated/auth/signup.html",
      init: async () => {
        const m = await import("./components/unauthenticated/auth/signup.js");

        return m.initSignup();
      },
    },
  };

  async function loadContent(url) {
    console.log('Loading content from:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to load content from ${url}. Status: ${response.status}. Using fallback content.`);
        return;
      }
      return await response.text();
    } catch (error) {
      console.warn(`Error loading content from ${url}:`, error.message);
      return; 
    }
  }

  async function handleRoute() {
    const path = window.location.pathname;

    if (path.startsWith("/authenticated")) {
      if (!isAuthenticated()) {
        alert("You must be logged in to access this page.");
        window.history.pushState({}, "", "/login");
        handleRoute();
        return;
      }
    }

    // New code to handle dynamic routes
    let matchedRoute = null;
    let params = {};

    for (const [routePath, routeConfig] of Object.entries(routes)) {
      const routeParts = routePath.split('/');
      const pathParts = path.split('/');

      if (routeParts.length === pathParts.length) {
        let match = true;
        for (let i = 0; i < routeParts.length; i++) {
          if (routeParts[i].startsWith(':')) {
            params[routeParts[i].slice(1)] = pathParts[i];
          } else if (routeParts[i] !== pathParts[i]) {
            match = false;
            break;
          }
        }
        if (match) {
          matchedRoute = routeConfig;
          break;
        }
      }
    }

    const route = matchedRoute || routes["/"];

    const content = await loadContent(route.template);

    const mainContent = document.getElementById("main-content");

    if (mainContent) {
      mainContent.innerHTML = content;

      // Wait for the next frame to ensure the content is rendered
      await new Promise(resolve => requestAnimationFrame(resolve));

      if (route.init) {
        await route.init(params);
      }
    } else {
      console.error("Main content element not found");
    }
  }

  function init() {
    window.addEventListener("popstate", handleRoute);

    document.body.addEventListener("click", (event) => {
      if (event.target.matches('a[href^="/"]')) {
        event.preventDefault();

        window.history.pushState({}, "", event.target.href);

        handleRoute();
      }
    });

    handleRoute();
  }

  return { init };
}
