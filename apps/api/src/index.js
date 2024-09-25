import cors from 'cors';
import express from 'express';
import { ObjectId } from 'mongodb';

/* eslint-disable import-x/extensions */
import { config } from './db/config.js';
import { connectToDatabase } from './db/db.js';
/* eslint-enable import-x/extensions */

const app = express();

app.use(
  cors({
    origin: config.isProduction
      ? ['https://travel-destinations-mu.vercel.app/']
      : ['http://localhost:8080', 'http://127.0.0.1:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  })
);

let db;

const initDb = async () => {
  try {
    return await connectToDatabase();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error; // Propagate the error
  }
};

app.use(express.json());
app.disable('x-powered-by');

// Middleware to ensure database connection
const ensureDbConnected = async (req, res, next) => {
  if (!db) {
    return res
      .status(500)
      .json({ error: 'Database connection not established' });
  }
  next();
};

// Apply the middleware to all routes
app.use(ensureDbConnected);

// Home route
app.get('/api', async (req, res) => {
  try {
    const collection = db.collection('travel_destinations_collection');
    const message = await collection.findOne({});
    res.json({
      message: message
        ? message.name
        : 'Welcome to the Travel Destinations Express API!'
    });
  } catch (error) {
    console.error('Error in home route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all travel destinations
app.get('/traveldestinations', async (req, res) => {
  try {
    const collection = db.collection('travel_destinations_collection');
    const destinations = await collection.find({}).toArray();
    res.status(200).json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single travel destination by ID
app.get('/traveldestinations/:id', async (req, res) => {
  try {
    const collection = db.collection('travel_destinations_collection');
    const destinationID = new ObjectId(req.params.id);
    const destination = await collection.findOne({ _id: destinationID });

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.json(destination);
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new travel destination
app.post('/traveldestinations', async (req, res) => {
  try {
    const collection = db.collection('travel_destinations_collection');
    const newDestination = req.body;

    const result = await collection.insertOne(newDestination);
    res.status(201).json({ ...newDestination, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing travel destination
app.put('/traveldestinations/:id', async (req, res) => {
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
    console.error('Error updating destination:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a travel destination
app.delete('/traveldestinations/:id', async (req, res) => {
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
    console.error('Error deleting destination:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    db = await initDb();

    app.listen(PORT, () => {
      console.log(
        `Server running in ${config.isProduction ? 'production' : 'development'} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
