import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import {redirect ,useNavigate} from 'react-router-dom';
import Alert from 'antd/es/alert/Alert';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // State to hold the token
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data=({
      username: formData.get('username'),
      password: formData.get('password'),
    });
    try {
      // Replace with your backend API endpoint for user authentication
      console.log("haha",data)
      const response = await axios.post('http://localhost:3000/api/auth/login',data,{
      headers: {
        'Content-Type': 'application/json',
      },
      }
      );
      console.log('User signed in successfully:', response.data);
      const newToken = response.data.token;

      // Store the token in localStorage
      localStorage.setItem('token', newToken);
  
      // Update the state with the new token
      setToken(newToken);
      setLoggedIn(true);
      navigate("/homepage")
   
      // Handle successful sign-in (e.g., redirect user, update state)
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle sign-in error (e.g., display error message to the user)
      setLoggedIn(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
        
        <div className="flex justify-center mx-auto max-w-2xl lg:max-w-none ">
              <img src="libraryLogo.svg" alt="logo"/>
        </div>

          <Typography component="h1" variant="h5" margin={5}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {loggedIn && (
              <Alert message="Failed! check your credientials " type="error" showIcon />
              )}

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}