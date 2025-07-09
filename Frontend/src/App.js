import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [books, setBooks] = useState([]);
  const [bookForm, setBookForm] = useState({ id: '', name: '', author: '', date: '' });
  const [editing, setEditing] = useState(false);

  const fetchBooks = async () => {
  const res = await axios.get('http://localhost:8080/api/book/getAll');
  setBooks(res.data);
};

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:8080/api/book/update/${bookForm.id}`, bookForm);
    } else {
      await axios.post('http://localhost:8080/api/book', bookForm);
    }
    setBookForm({ id: '', name: '', author: '', date: '' });
    setEditing(false);
    fetchBooks(); // 👈 Refresh the list in the same page
  };

  const handleEdit = (book) => {
    setBookForm(book);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/book/delete/${id}`);
    fetchBooks(); // 👈 Refresh after delete
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{
        textAlign:"center",
        fontSize:"50px"
      }}>Book Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="name"
          placeholder="Book Name"
          value={bookForm.name}
          onChange={handleChange}
          required style={{ marginLeft:"10rem",padding:"10px",width:"150px",borderRadius:"5px",border:"2px solid grey"}}
        />
        <input
          name="author"
          placeholder="Author"
          value={bookForm.author}
          onChange={handleChange}
          required style={{ marginLeft:"10rem",padding:"10px",width:"150px",borderRadius:"5px",border:"2px solid grey"}}
        />
        <input
          name="date"
          type="date"
          value={bookForm.date}
          onChange={handleChange}
          required style={{padding:"10px",marginLeft:"10rem" ,width:"150px",borderRadius:"5px",border:"2px solid grey"}}
        />
        <button type="submit" style={{ marginLeft: '10rem', margin:"20px",padding:"10px" ,width:"150px",borderRadius:"5px",border:"2px solid grey"}}>
         Add-Book
        </button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Author</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>
  {new Date(book.date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}
</td>

              <td>
                <button onClick={() => handleEdit(book)} style={{backgroundColor:"green",width:"80px",height:"30px",
                  border:"none",borderRadius:"3px",marginRight:"30px",padding:"10px"
                }}>Edit</button>{' '}
                <button onClick={() => handleDelete(book.id)}
                  style={{backgroundColor:"red",width:"80px",height:"30px",
                  border:"none",borderRadius:"3px",padding:"10px"}}
                  >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
