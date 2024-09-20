const cors = require('cors');
const express = require('express');

const app = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', '*']
  })
);

app.use(express.json());
app.disable('x-powered-by');

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Travel Destinations Express API!' });
});

app.listen(port, () => {
  // Use a logger instead of console.log
  // console.log(`API server running at http://localhost:${port}`);
});
