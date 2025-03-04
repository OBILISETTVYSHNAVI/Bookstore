// frontend/src/components/UpdateBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateBook({ match }) {
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch the book details to edit
    axios.get(`http://localhost:5000/api/books/${match.params.id}`)
      .then(response => {
        setBook(response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPrice(response.data.price);
        setDescription(response.data.description);
      })
      .catch(error => console.log(error));
  }, [match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = { title, author, price, description };

    axios.put(`http://localhost:5000/api/books/update/${match.params.id}`, updatedBook)
      .then(response => {
        console.log('Book updated:', response.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Edit Book</h1>
      {book ? (
        <form onSubmit={handleSubmit}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          <button type="submit">Update Book</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UpdateBook;
