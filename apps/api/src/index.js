const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Travel Destinations API!' });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
