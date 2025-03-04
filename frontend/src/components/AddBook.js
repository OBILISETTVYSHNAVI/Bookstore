// frontend/src/components/AddBook.js
import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = { title, author, price, description };

    axios.post('http://localhost:5000/api/books/add', newBook)
      .then(response => {
        console.log('Book added:', response.data);
        // Optionally clear form or navigate to the list
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} required />
        <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} required></textarea>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
