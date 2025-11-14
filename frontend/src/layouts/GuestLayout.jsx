import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import Navbar from '../components/Nav/Navbar';

const GuestLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(180deg, #0a0e27 0%, #151932 100%)' }}>
      <Navbar />
      <Container component="main" maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          p: 3,
          mt: 'auto',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(21, 25, 50, 0.95) 100%)',
          borderTop: '1px solid rgba(0, 212, 255, 0.15)'
        }}
      >
        <Typography variant="body2" sx={{ color: '#a5b4fc', fontSize: '0.875rem', letterSpacing: '0.04em' }}>
          &copy; {new Date().getFullYear()} Reviewly
        </Typography>
      </Box>
    </Box>
  );
};

export default GuestLayout;