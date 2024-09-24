import cors from 'cors';
import express from 'express';

// eslint-disable-next-line import-x/extensions
import { connectToDatabase } from './db/db.js';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ['*'],
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

/* eslint-disable n/no-process-env */
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {});
}
/* eslint-enable n/no-process-env */

export default app;
