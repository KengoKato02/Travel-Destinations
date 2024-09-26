import cors from 'cors';
import express from 'express';
import { ObjectId } from 'mongodb';

/* eslint-disable import-x/extensions */
import { config } from './db/config.js';
import { connectToDatabase } from './db/db.js';
/* eslint-enable import-x/extensions */

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
      origin:
        config.isProduction === 'production'
          ? ['https://travel-destinations-mu.vercel.app/']
          : ['http://localhost:8080', 'http://127.0.0.1:8080'],
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
    console.log('in start server', db);

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
  app.get('/api', getHomeRoute);
  app.get('/api/destinations', getAllDestinations);
  app.get('/api/destinations/:id', getDestinationById);
  app.post('/api/destinations', createDestination);
  app.put('/api/destinations/:id', updateDestination);
  app.delete('/api/destinations/:id', deleteDestination);
}

async function getHomeRoute(req, res) {
  try {
    const collection = db.collection('travel_destinations_collection');
    const message = await collection.findOne({});
    res.json({
      message: message
        ? message.name
        : 'Welcome to the Travel Destinations Express API!'
    });
  } catch (error) {
    handleError(error, res, 'Error in home route');
  }
}

async function getAllDestinations(req, res) {
  try {
    const collection = db.collection('travel_destinations_collection');
    const filtered = getFilterQuery(req.query);

    const destinations = await collection.find(filtered).toArray();
    res.status(200).json(destinations);
  } catch (error) {
    handleError(error, res, 'Error fetching destinations');
  }
}

async function getDestinationById(req, res) {
  try {
    const collection = db.collection('travel_destinations_collection');
    const destinationID = new ObjectId(req.params.id);
    const destination = await collection.findOne({ _id: destinationID });

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.json(destination);
  } catch (error) {
    handleError(error, res, 'Error fetching destination');
  }
}

async function createDestination(req, res) {
  try {
    const collection = db.collection('travel_destinations_collection');
    const newDestination = req.body;

    const result = await collection.insertOne(newDestination);
    res.status(201).json({ ...newDestination, _id: result.insertedId });
  } catch (error) {
    handleError(error, res, 'Error creating destination');
  }
}

async function updateDestination(req, res) {
  try {
    const collection = db.collection('travel_destinations_collection');
    const updatedDestination = req.body;

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedDestination },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.json(result.value);
  } catch (error) {
    handleError(error, res, 'Error updating destination');
  }
}

async function deleteDestination(req, res) {
  try {
    const collection = db.collection('travel_destinations_collection');
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.status(204).send();
  } catch (error) {
    handleError(error, res, 'Error deleting destination');
  }
}

function handleError(error, res, message) {
  console.error(`${message}:`, error);
  res.status(500).json({ error: 'Internal Server Error' });
}

function getFilterQuery(filters) {
  const query = {};

  const { name, location, travelDateFrom, travelDateTo, hasDescription } =
    filters;

  if (name) {
    query.name = name;
  }
  if (location) {
    query.location = location;
  }

  if (travelDateFrom || travelDateTo) {
    query.$and = [];
    if (travelDateFrom) {
      query.$and.push({ travelDateFrom: { $gte: travelDateFrom } });
    }
    if (travelDateTo) {
      query.$and.push({ travelDateTo: { $lte: travelDateTo } });
    }
  }

  if (hasDescription) {
    query.description = { $exists: hasDescription.trim() === 'true' };
  }

  return query;
}
