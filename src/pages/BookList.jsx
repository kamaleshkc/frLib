import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import axios from 'axios';



const BookList = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [books, setBooks] = useState([]);

  function createData(title, author, language, link) {
    return { title, author, language, link };
  }
  

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/book/list',{
          headers: {
            'Authorization': token, // Use 'Bearer' if it's a bearer token
           
          }})
        ;
        setBooks(response.data);
        
       
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts






  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell align="right">Language</TableCell>
          <TableCell align="right">Author</TableCell>
          <TableCell align="right">Image Link</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {books.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.title}
            </TableCell>
            <TableCell align="right">{row.author}</TableCell>
            <TableCell align="right">{row.language}</TableCell>
            <TableCell align="right">{row.link}</TableCell>
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default BookList