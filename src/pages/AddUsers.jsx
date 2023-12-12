import React from 'react'
import { useState,useEffect } from 'react';
import { TextField,Button } from '@mui/material';
import axios from 'axios';
import { message } from 'antd';

const AddUsers = () => {
  // State to hold the token
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name:'',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
        // Replace with your backend API endpoint for user registration
        const response = await axios.post('http://localhost:3000/api/auth/register', formData);
        console.log('User registered successfully:', response.data);
        message.success('User created.')
      
        // Handle successful registration (e.g., redirect user, show success message)
        } catch (error) {
        console.error('Error registering user:', error);
        // Handle registration error (e.g., display error message to the user)
        message.error("Uh oh something is wrong")
        }

  };



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
      <label htmlFor="bookTitle">Username:</label>
      <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
      <label htmlFor="bookTitle">Full Name:</label>
                 <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                />
<label htmlFor="bookTitle">email:</label>
<TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
<label htmlFor="bookTitle">Password:</label>

<TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password }
                  onChange={handleChange}
                  autoComplete="new-password"
                />

        <br />
        <Button variant="contained" type='submits'>Add User.</Button>
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

export default AddUsers