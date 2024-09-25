import cors from 'cors';
import express from 'express';
import { ObjectId } from 'mongodb';

// eslint-disable-next-line import-x/extensions
import { connectToDatabase } from './db/db.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  })
);

let db;
const initDb = async () => {
  try {
    db = await connectToDatabase();
  } catch {
    process.exit(1); // Exit the process if the DB connection fails
  }
};

app.use(express.json());
app.disable('x-powered-by');

// Home route
app.get('/api', async (req, res) => {
  const collection = db.collection('travel_destinations_collection');
  const message = await collection.findOne({});
  res.json({
    message: message
      ? message.name
      : 'Welcome to the Travel Destinations Express API!'
  });
});

// Get all travel destinations
app.get('/traveldestinations', async (req, res) => {
  try {
    const collection = db.collection('travel_destinations_collection');
    const destinations = await collection.find({}).toArray();
    res.status(200).json(destinations);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
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
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
});

// Create a new travel destination
app.post('/traveldestinations', async (req, res) => {
  try {
    const collection = db.collection('travel_destinations_collection');
    const newDestination = req.body;

    const addedDestination = await collection.insertOne(newDestination);
    res.status(201).json(addedDestination);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
});

// Update an existing travel destination
app.put('/traveldestinations/:id', async (req, res) => {
  try {
    const collection = db.collection('travel_destinations_collection');
    const updatedDestination = req.body;

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedDestination }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.json(updatedDestination);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
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
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
});

const startServer = async () => {
  await initDb();

  app.listen(3000, () => {});
};

startServer();

export default app;
