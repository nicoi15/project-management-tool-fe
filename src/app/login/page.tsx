'use client';

import React from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from '@mui/material';

const Login = () => {
  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'red',
      }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
        }}>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
          />
          <Button
            type='button'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={() => console.log('Login')}>
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  );
};
export default Login;
