import React, { useState } from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Nav/Navbar';
import Sidebar from '../components/Nav/Sidebar';

const drawerWidth = 280;

const AdminLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(180deg, #0a0e27 0%, #151932 60%, #0a0e27 100%)' }}>
          <Navbar handleDrawerToggle={handleDrawerToggle} />
          <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ 
              flexGrow: 1, 
              px: { xs: 3, md: 5 },
              py: { xs: 3, md: 5 },
              width: { sm: `calc(100% - ${drawerWidth}px)` }, 
              minHeight: '100vh',
              color: '#e0e7ff',
              position: 'relative'
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
  );
};

export default AdminLayout;