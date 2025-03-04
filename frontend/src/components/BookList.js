// frontend/src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = ({ setBook }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => setBooks(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.price}</p>
            <p>{book.description}</p>
            <button onClick={() => setBook(book)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
