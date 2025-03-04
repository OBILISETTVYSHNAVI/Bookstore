// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes.js');
const app = express();
const PORT = 7000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection

mongoose.connect('mongodb://localhost:27017/bookstore')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API');
});
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
