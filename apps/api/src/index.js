import cors from 'cors';
import express from 'express';

import { connectToDatabase } from './db/db';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', '*']
  })
);

app.use(express.json());
app.disable('x-powered-by');

app.get('/api', async (req, res) => {
  const db = await connectToDatabase();
  const collection = db.collection('messages');
  const message = await collection.findOne({});
  res.json({
    message: message
      ? message.text
      : 'Welcome to the Travel Destinations Express API!'
  });
});

app.listen(port, () => {});
