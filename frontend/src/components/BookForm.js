// frontend/src/components/BookForm.js
import React, { useState } from 'react';
import axios from 'axios';

const BookForm = ({ book, setBook, refreshBooks }) => {
  const [formData, setFormData] = useState({
    title: book ? book.title : '',
    author: book ? book.author : '',
    price: book ? book.price : '',
    description: book ? book.description : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (book) {
      axios.put(`http://localhost:5000/api/books/${book._id}`, formData)
        .then(() => {
          setBook(null);
          refreshBooks();
        })
        .catch((err) => console.log(err));
    } else {
      axios.post('http://localhost:5000/api/books', formData)
        .then(() => refreshBooks())
        .catch((err) => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <button type="submit">{book ? 'Update Book' : 'Add Book'}</button>
    </form>
  );
};

export default BookForm;
