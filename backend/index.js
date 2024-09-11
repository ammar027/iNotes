require('dotenv').config({ path: 'backend/.env' });
const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express();
const port = 5000;

// backend/index.js or app.js
const cors = require('cors');
app.use(cors({
  origin: 'https://ammars-inotes.vercel.app/', // Your Vercel front-end URL
}));


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
