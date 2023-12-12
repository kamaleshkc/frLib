import React from 'react'
import { useState,useEffect } from 'react';
import axios
 from 'axios';
 import { message } from 'antd';
import { TextField,Button } from '@mui/material';

const Addbooks = () => {

  // State to hold the token
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    title : '',
    author: '',
    language:'',
    imageLink: '',
  });

    const fetchBookList = () => {
      axios.get('/http://localhost:3000/api/book/list',{
        headers: {
          'Authorization': token, // Use 'Bearer' if it's a bearer token
        }})
        .then(response => {
          if (response.data.success) {
            setBooks(response.data.books);
          } else {
            
          }
        })
        .catch(error => {
          console.error('Error fetching book list:', error);
         
        });
    };
  useEffect(() => {
    fetchBookList();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data=({
      title: formData.get('title'),
      author: formData.get('author'),
      language: formData.get('language'),
      imageLink:formData.get('imageLink')
    });
   
    
    axios.post('http://localhost:3000/api/book/add',data,{
      headers: {
        'Authorization': token, // Use 'Bearer' if it's a bearer token
      }})
      .then(response => {
        if (response.data.success) {
         
          setFormData({
            title : '',
            author: '',
            language:'',
            imageLink: '',
          })
          message.success("Book added.")
        } else {
          message.success("Book added.")
        }
      })
      .catch(error => {
        console.error('Error adding book:', error);
        message.error("Book add failed.")
      });
  };



  return (
    <div>
     

      {/* User Form */}
      <form>
        {/* ... (previous user form) */}
      </form>
      <ul>
        {/* ... (previous user list) */}
      </ul>

      {/* Book Form */}
      <form onSubmit={handleSubmit}>
      <label htmlFor="bookTitle">Book Title:</label>
        <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="book title"
              type="text"
              id="title"
              autoComplete="current-password"
            />


<label htmlFor="bookTitle">Book Author :</label> 
        
<TextField
              margin="normal"
              required
              fullWidth
              name="author"
              label="author"
              type="text"
              id="author"
              autoComplete="current-password"
            />



<label htmlFor="bookTitle">Language :</label> 

<TextField
              margin="normal"
              required
              fullWidth
              name="language"
              label="language"
              type="text"
              id="language"
              autoComplete="current-password"
            />
<label htmlFor="bookTitle">Image Link :</label> 
          <TextField
              margin="normal"
              required
              fullWidth
              name="imageLink"
              label="Image Link"
              type="text"
              id="imageLink"
              autoComplete="current-password"
              onChange={handleChange}
            />


        <br />
        <Button variant="contained" type='submits'>Add books.</Button>
      </form>

      <h2>Book List</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            Book Title: {book.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Addbooks