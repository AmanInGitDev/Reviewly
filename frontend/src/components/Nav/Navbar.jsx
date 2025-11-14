import React from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, 
  Avatar, Tooltip, Chip, Stack, useTheme, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const Navbar = ({ handleDrawerToggle }) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/login');
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'System Administrator') return '/admin/dashboard';
    if (user.role === 'Store Owner') return '/owner/dashboard';
    if (user.role === 'Normal User') return '/stores';
    return '/';
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getProfileLink = () => {
    if (!user) return '/login';
    if (user.role === 'System Administrator') return '/admin/profile';
    return '/profile';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'System Administrator': return 'error';
      case 'Store Owner': return 'warning';
      case 'Normal User': return 'success';
      default: return 'default';
    }
  };

  const isDashboard = !!handleDrawerToggle;

  return (
    <AppBar
      position={isDashboard ? "fixed" : "static"}
      elevation={0}
      sx={{
        background: 'rgba(10, 14, 39, 0.85) !important',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        ...(isDashboard ? {
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        } : {}),
        '& .MuiToolbar-root': {
          minHeight: 64,
        }
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        {isDashboard && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              color: '#00d4ff',
              '&:hover': {
                backgroundColor: 'rgba(0, 212, 255, 0.15)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          {!isDashboard && (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ 
                  background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                  width: 40,
                  height: 40,
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
                }}>
                  <DashboardIcon />
                </Avatar>
                <Typography 
                  variant="h5" 
                  component="div" 
                  sx={{ 
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
                    letterSpacing: '0.05em',
                  }}
                >
                  REVIEWLY
                </Typography>
              </Stack>
            </Link>
          )}
        </Box>
        
        <Box sx={{ flexGrow: 0 }}>
          {isAuthenticated ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              {!isMobile && (
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Typography variant="body2" sx={{ color: '#a5b4fc', fontWeight: 500, fontSize: '0.875rem' }}>
                    Welcome,
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#e0e7ff', fontWeight: 600, fontSize: '0.9375rem' }}>
                    {user.name}
                  </Typography>
                  <Chip 
                    label={user.role} 
                    size="small" 
                    sx={{ 
                      fontWeight: 600, 
                      fontSize: '0.75rem',
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      color: '#00d4ff',
                      height: 24,
                    }}
                  />
                </Stack>
              )}
              
              <Tooltip title="Account settings">
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ 
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40,
                      background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                      fontWeight: 700,
                      boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
                    }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon />}
                  </Avatar>
                </IconButton>
              </Tooltip>
              
              <Menu
                sx={{ 
                  mt: '45px',
                  '& .MuiPaper-root': {
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.95) 0%, rgba(45, 27, 78, 0.9) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 212, 255, 0.1)',
                    minWidth: 200,
                  }
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem 
                  component={Link} 
                  to={getDashboardLink()} 
                  onClick={handleCloseUserMenu}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 212, 255, 0.12)',
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <DashboardIcon sx={{ fontSize: 20, color: '#00d4ff' }} />
                    <Typography sx={{ fontWeight: 500, color: '#e0e7ff', fontSize: '0.9375rem' }}>Dashboard</Typography>
                  </Stack>
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  to={getProfileLink()} 
                  onClick={handleCloseUserMenu}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 212, 255, 0.12)',
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PersonIcon sx={{ fontSize: 20, color: '#00d4ff' }} />
                    <Typography sx={{ fontWeight: 500, color: '#e0e7ff', fontSize: '0.9375rem' }}>Profile</Typography>
                  </Stack>
                </MenuItem>
                <MenuItem 
                  onClick={() => { handleCloseUserMenu(); handleLogout(); }}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 51, 102, 0.12)',
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LogoutIcon sx={{ fontSize: 20, color: '#ff3366' }} />
                    <Typography sx={{ fontWeight: 500, color: '#e0e7ff', fontSize: '0.9375rem' }}>Logout</Typography>
                  </Stack>
                </MenuItem>
              </Menu>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center">
              <Button 
                component={Link} 
                to="/login" 
                variant="text"
                sx={{ 
                  color: '#e0e7ff',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 212, 255, 0.15)',
                    color: '#00d4ff',
                  }
                }}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/signup" 
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5ee7ff 0%, #d966ff 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 32px rgba(0, 212, 255, 0.5)',
                  }
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;