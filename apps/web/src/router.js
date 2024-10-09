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
    "/authenticated/trips": {
      template: "/authenticated/trips.html",
      init: null, // Assuming no specific initialization for trips page yet
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
    const response = await fetch(url);

    return response.text();
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

    const route = routes[path] || routes["/"];

    const content = await loadContent(route.template);

    const mainContent = document.getElementById("main-content");

    if (mainContent) {
      mainContent.innerHTML = content;

      if (route.init) {
        await route.init();
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
