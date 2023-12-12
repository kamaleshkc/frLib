// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token') || '');

 
 

  const handleBookClick = async (book) => {
    try {
      // Replace with your backend API endpoint for user authentication
      const data={bookId:book._id}
      console.log(data)
      const response = await axios.post('http://localhost:3000/api/rental/rent',data,{
        headers: {
          'Authorization': token, // Use 'Bearer' if it's a bearer token
        }}
      );
      message.success("your request has been sent.")

     
    } catch (error) {
      console.error('Error:', error);
    
      message.error("Failure something is wrong")

    }




  };

  const handleButton=()=>{
    
    navigate("/mybooks");

  }


  // Function to handle logout and remove the token from localStorage
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    navigate("/signin")
    
  };


  // Update filteredBooks whenever books or searchQuery changes
  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [books, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

    <div>
        
        <div className="flex justify-center mx-auto max-w-2xl lg:max-w-none m-10 ">
              <img src="libraryLogo.svg" alt="logo"/>
        </div>
        <div className='flex justify-center mt-5'>
            <TextField sx={{width:500}} id="outlined-search"  label="Search books" type="search" value={searchQuery}onChange={handleSearchChange}/>
        </div>
        <div className='flex justify-center mt-5'>
            <Button  type="search" onClick={handleButton}>your list.</Button>
        </div>


             <div className='flex justify-center m-5'>
            

            <ul className='flex flex-wrap gap1 gap-5 '>
                {filteredBooks.map((book) => (
                        <Card sx={{ width: 300}} key={book._id}>
                            <CardMedia
                            sx={{ height: 300 }}
                            image={book.imageLink}
                            title="book"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                            </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Author:{book.author}
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Button  size="small" onClick={()=>handleBookClick(book)}>Rent Request</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                        </Card>
                ))}
            </ul>
            <div className='flex justify-center mt-5'>
           
            </div>
            </div>
            <div className='flex justify-center m-20 '>
              <Button  className='my-10 color-moccasin' type="search" onClick={handleLogout}>Log out.</Button>
            </div>
            
            </div>
   
  );
};

export default HomePage;
