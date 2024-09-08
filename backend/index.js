require('dotenv').config({ path: 'backend/.env' });
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

// Use CORS with default options
app.use(cors());

app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello Ammar!');
});

app.listen(port, () => {
  console.log(`iNotes Backend is on port http://localhost:${port}`);
});
