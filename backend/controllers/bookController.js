// backend/controllers/bookController.js
const Book = require('../models/Book');

// Create a book
const createBook = async (req, res) => {
  const { title, author, price, description } = req.body;
  const newBook = new Book({ title, author, price, description });
  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: 'Error creating book' });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching books' });
  }
};

// Get a single book by ID
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching book' });
  }
};

// Update a book
const updateBook = async (req, res) => {
  const { title, author, price, description } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, price, description },
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: 'Error updating book' });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting book' });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
};
