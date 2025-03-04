// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
