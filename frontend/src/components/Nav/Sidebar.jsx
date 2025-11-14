import React from 'react';
import { 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Toolbar, Box, Divider, Typography, Avatar, Stack, Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 280;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
    const { user, isAdmin, isStoreOwner, isNormalUser } = useAuth();
  const location = useLocation();

  let navItems = [];
  if (isAdmin) {
    navItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
      { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users' },
      { text: 'Store Management', icon: <StorefrontIcon />, path: '/admin/stores' },
    ];
  } else if (isStoreOwner) {
    navItems = [
      { text: 'Owner Dashboard', icon: <DashboardIcon />, path: '/owner/dashboard' },
      { text: 'My Stores', icon: <StorefrontIcon />, path: '/stores' },
    ];
  } else if (isNormalUser) {
    navItems = [
      { text: 'All Stores', icon: <StorefrontIcon />, path: '/stores' },
      { text: 'My Ratings', icon: <StarIcon />, path: '/my-ratings' },
    ];
  }

  if (user) {
    navItems.push({ text: 'Profile', icon: <AccountCircleIcon />, path: isAdmin ? '/admin/profile' : '/profile' });
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'System Administrator': return 'error';
      case 'Store Owner': return 'warning';
      case 'Normal User': return 'success';
      default: return 'default';
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 212, 255, 0.2)' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ 
              background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
              width: 48,
              height: 48,
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
            }}>
              <BusinessIcon />
            </Avatar>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                  letterSpacing: '0.05em',
                }}
              >
                REVIEWLY
              </Typography>
              <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 500 }}>
                Space Platform
              </Typography>
            </Box>
          </Stack>
        </Link>
      </Box>

      {/* User Info */}
      {user && (
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 212, 255, 0.2)' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ 
              background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
              width: 40,
              height: 40,
              fontWeight: 700,
              boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)',
            }}>
              {user.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon />}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9375rem', noWrap: true }}>
                {user.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', fontSize: '0.8125rem', mb: 0.5, fontWeight: 500 }}>
                {user.email}
              </Typography>
              <Chip 
                label={user.role} 
                size="small" 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.7rem',
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  color: '#00d4ff',
                  height: 22,
                }}
              />
            </Box>
          </Stack>
        </Box>
      )}

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ px: 2, py: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&.Mui-selected': {
                    background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.2) 0%, rgba(176, 38, 255, 0.2) 100%)',
                    borderLeft: '3px solid #00d4ff',
                    '&:hover': {
                      background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.3) 0%, rgba(176, 38, 255, 0.3) 100%)',
                    },
                    '& .MuiListItemIcon-root': { 
                      color: '#00d4ff',
                    },
                    '& .MuiListItemText-primary': {
                      color: '#00d4ff',
                      fontWeight: 600,
                    }
                  },
                  '&:hover': {
                    background: 'rgba(0, 212, 255, 0.12)',
                    transform: 'translateX(4px)',
                    boxShadow: '0 4px 12px rgba(0, 212, 255, 0.15)',
                  },
                  '& .MuiListItemIcon-root': { 
                    color: location.pathname === item.path ? '#00d4ff' : '#cbd5e1',
                    transition: 'color 0.2s ease-in-out',
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    color: location.pathname === item.path ? '#00d4ff' : '#ffffff',
                    transition: 'all 0.2s ease-in-out',
                    fontSize: '0.875rem',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3, borderTop: '1px solid rgba(0, 212, 255, 0.15)' }}>
        <Typography variant="caption" sx={{ 
          color: '#cbd5e1', 
          textAlign: 'center',
          display: 'block',
          fontWeight: 500,
          fontSize: '0.8125rem',
        }}>
          &copy; {new Date().getFullYear()} Reviewly
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="navigation"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: 'linear-gradient(180deg, rgba(10, 14, 39, 0.95) 0%, rgba(21, 25, 50, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(0, 212, 255, 0.2)',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ 
          display: { xs: 'none', sm: 'block' }, 
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: 'linear-gradient(180deg, rgba(10, 14, 39, 0.95) 0%, rgba(21, 25, 50, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(0, 212, 255, 0.2)',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
          } 
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;