import React, { useState, useEffect } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "./services/bookService.js";

function App() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({ title: "", author: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch books from API
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  // Handle input change
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateBook(editingId, book);
      setEditingId(null);
    } else {
      await addBook(book);
    }
    setBook({ title: "", author: "", price: "" });
    fetchBooks();
  };

  // Handle Edit
  const handleEdit = (book) => {
    setBook({ title: book.title, author: book.author, price: book.price });
    setEditingId(book._id);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>📚 Bookstore App</h1>

      {/* Add/Edit Book Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={book.price} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update" : "Add"} Book</button>
      </form>

      {/* Book List */}
      <ul>
        {books.map((b) => (
          <li key={b._id}>
            {b.title} by {b.author} - ${b.price}
            <button onClick={() => handleEdit(b)}>✏️ Edit</button>
            <button onClick={() => handleDelete(b._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
