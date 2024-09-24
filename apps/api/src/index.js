import cors from 'cors';
import express from 'express';

// eslint-disable-next-line import-x/extensions
import { connectToDatabase } from './db/db.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', '*']
  })
);

app.use(express.json());
app.disable('x-powered-by');

app.get('/api', async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection('travel_destinations_collection');
  const message = await collection.findOne({});
  res.json({
    message: message
      ? message.name
      : 'Welcome to the Travel Destinations Express API!'
  });
});

app.listen(3000);

export default app;
