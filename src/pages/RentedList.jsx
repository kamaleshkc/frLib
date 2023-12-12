import React from 'react'
 import { useEffect,useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const RentedList = () => {
 // State to hold the token
 const [token, setToken] = useState(localStorage.getItem('token') || '');

 const [bookData, setBookData] = useState([]);
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rental/list',{
          headers: {
            'Authorization': token, // Use 'Bearer' if it's a bearer token
           
          }})
        ;
          setBookData(response.data)
       console.log(response.data)
       
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts




  return (
   <div>
      <h1>Book List</h1>
      <ul>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Rented book title</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">returned</TableCell>
            <TableCell align="right">returnDate</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {bookData.map(({ book, rentalDate, returned, returnDate, fine }) => (
            <TableRow
              key={book._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {book.title}
              </TableCell>
              <TableCell align="right">{book.author}</TableCell>
              <TableCell align="right">{book.country}</TableCell>
              <TableCell align="right">{book.rentalDate}</TableCell>
              <TableCell align="right">{returned ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{returnDate}</TableCell>
              <TableCell align="right">{fine}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
      </ul>
    </div>
  )
}

export default RentedList