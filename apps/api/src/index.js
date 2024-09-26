import cors from 'cors';
import express from 'express';

import {
  getHomeRoute,
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} from './controllers/destinations.js';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from './controllers/users.js';
import { config } from './db/config.js';
import { connectToDatabase } from './db/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

startServer();
setupMiddleware();
setupRoutes();

let db;

export default app;

function setupMiddleware() {
  app.use(
    cors({
      origin: [
        'https://travel-destinations-mu.vercel.app/',
        'http://localhost:8080',
        'http://127.0.0.1:8080'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type']
    })
  );
  app.use(express.json());
  app.disable('x-powered-by');
}

async function startServer() {
  try {
    db = await connectToDatabase();

    app.listen(PORT, () => {
      console.log(
        `Server running in ${config.isProduction ? 'production' : 'development'} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

function setupRoutes() {
  // DESTINATION ROUTES
  app.get('/api/v1', (req, res) => getHomeRoute(req, res, db));
  app.get('/api/v1/destinations', (req, res) =>
    getAllDestinations(req, res, db)
  );
  app.get('/api/v1/destinations/:id', (req, res) =>
    getDestinationById(req, res, db)
  );
  app.post('/api/v1/destinations', (req, res) =>
    createDestination(req, res, db)
  );
  app.put('/api/v1/destinations/:id', (req, res) =>
    updateDestination(req, res, db)
  );
  app.delete('/api/v1/destinations/:id', (req, res) =>
    deleteDestination(req, res, db)
  );

  // USER ROUTES
  app.get('/api/v1/users', (req, res) => getAllUsers(req, res, db));
  app.get('/api/v1/users/:id', (req, res) => getUserById(req, res, db));
  app.post('/api/v1/users', (req, res) => createUser(req, res, db));
  app.put('/api/v1/users/:id', (req, res) => updateUser(req, res, db));
  app.delete('/api/v1/users/:id', (req, res) => deleteUser(req, res, db));
}
