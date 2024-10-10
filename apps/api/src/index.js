import cors from "cors";

import express from "express";

import {
  getHomeRoute,
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "./controllers/destinations.js";

import {
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "./controllers/users.js";

import {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  getTripsByUser,
  addDestinationToTrip,
  removeDestinationFromTrip,
} from "./controllers/trips.js";

import { config } from "./db/config.js";

import { connectToDatabase } from "./db/db.js";

import { validateObjectId } from "./middleware/validateObjectId.js";

import { verifyAdmin, verifyToken, login, signup } from "./controllers/auth.js";

const app = express();

const PORT = process.env.PORT || 3000;

startServer();

setupMiddleware();

setupRoutes();

export default app;

function setupMiddleware() {
  app.use(
    cors({
      origin: [
        "https://travel-destinations-mu.vercel.app",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
    })
  );

  app.use(express.json());

  app.disable("x-powered-by");
}

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(
        `Server running in ${
          config.isProduction ? "production" : "development"
        } mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start the server:", error);

    process.exit(1);
  }
}

function setupRoutes() {
  app.options("*", cors());

  // DESTINATION ROUTES
  app.get("/api/v1", (req, res) => getHomeRoute(req, res));

  app.get("/api/v1/destinations", (req, res) =>
    getAllDestinations(req, res)
  );

  app.get("/api/v1/destinations/:id", (req, res) =>
    getDestinationById(req, res)
  );

  app.post("/api/v1/destinations", (req, res) =>
    createDestination(req, res)
  );

  app.put("/api/v1/destinations/:id", (req, res) =>
    updateDestination(req, res)
  );

  app.delete("/api/v1/destinations/:id", (req, res) =>
    deleteDestination(req, res)
  );

  // USER ROUTES
  app.get("/api/v1/users", (req, res) => getAllUsers(req, res));

  app.get("/api/v1/users/:email", (req, res) =>
    getUserByEmail(req, res)
  );

  // AUTHENTICATION ROUTES
  app.put("/api/v1/users/:email", (req, res) =>
    updateUser(req, res)
  );

  app.delete("/api/v1/users/:email", (req, res) =>
    deleteUser(req, res)
  );

  app.post("/api/v1/auth/login", login);
  app.post("/api/v1/auth/signup", signup);

  // TRIP ROUTES
  app.get("/api/v1/trips", (req, res) => getAllTrips(req, res));
  app.get("/api/v1/trips/:id", validateObjectId("id"), getTripById);
  app.post("/api/v1/trips", (req, res) => createTrip(req, res));
  app.put("/api/v1/trips/:id", validateObjectId("id"), updateTrip);
  app.delete("/api/v1/trips/:id", validateObjectId("id"), deleteTrip);
  app.get("/api/v1/trips/user/:id", validateObjectId("id"), getTripsByUser);
  app.post('/api/v1/trips/:id/destinations', (req, res) => addDestinationToTrip(req, res));
  app.delete('/api/v1/trips/:id/destinations/:destinationId', (req, res) => removeDestinationFromTrip(req, res));
}
