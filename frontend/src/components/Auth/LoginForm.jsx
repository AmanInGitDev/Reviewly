import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Button, Typography, Link, Paper, 
  Stack, Divider, useTheme, useMediaQuery
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';
import AlertDialog from '../Common/AlertDialog';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setSuccessMessage('');
    try {
        const loggedInUser = await login(email, password);
        if (loggedInUser.role === 'System Administrator') {
          navigate('/admin/dashboard');
        } else if (loggedInUser.role === 'Store Owner') {
            navigate('/owner/dashboard');
      } else {
        navigate('/stores');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || String(err);
      setError(errorMessage);
  } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Signing you in..." />;
  }

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: { xs: 4, sm: 5, md: 6 }, 
        width: '100%',
        maxWidth: 440,
        mx: 'auto',
        background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.98) 0%, rgba(45, 27, 78, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 212, 255, 0.2)',
        borderRadius: 3,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ 
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
          mb: 3,
          boxShadow: '0 8px 24px rgba(0, 212, 255, 0.3)',
        }}>
          <LockOutlinedIcon sx={{ fontSize: 32, color: '#0a0e27' }} />
        </Box>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            mb: 1,
            color: '#e0e7ff',
            fontSize: { xs: '1.75rem', sm: '2rem' },
            letterSpacing: '-0.01em',
          }}
        >
          Welcome Back
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#a5b4fc',
            fontSize: '0.9375rem',
          }}
        >
          Sign in to your account to continue
        </Typography>
      </Box>

      {successMessage && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3, 
            width: '100%',
            borderRadius: 2,
            background: 'rgba(0, 255, 136, 0.1)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            color: '#00ff88',
            '& .MuiAlert-message': {
              fontWeight: 500,
            }
          }}
        >
          {successMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <Stack spacing={2.5}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              '& .MuiInputLabel-root': {
                color: '#a5b4fc',
              },
            }}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              '& .MuiInputLabel-root': {
                color: '#a5b4fc',
              },
            }}
          />
          
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            size="large"
            disabled={isLoading}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
              boxShadow: '0 4px 16px rgba(0, 212, 255, 0.3)',
              borderRadius: 2,
              textTransform: 'none',
              letterSpacing: '0.05em',
              '&:hover': {
                background: 'linear-gradient(135deg, #5ee7ff 0%, #d966ff 100%)',
                boxShadow: '0 6px 24px rgba(0, 212, 255, 0.4)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                background: 'rgba(0, 212, 255, 0.2)',
                color: 'rgba(224, 231, 255, 0.5)',
              }
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Stack>

        <Divider sx={{ my: 4, borderColor: 'rgba(0, 212, 255, 0.15)' }}>
          <Typography variant="body2" sx={{ color: '#6366f1', px: 2, fontSize: '0.8125rem' }}>
            OR
          </Typography>
        </Divider>

        <Typography variant="body2" align="center" sx={{ color: '#a5b4fc', fontSize: '0.9375rem' }}>
          Don't have an account?{' '}
          <Link 
            component="button" 
            type="button" 
            onClick={() => navigate('/signup')} 
            underline="none"
            sx={{ 
              fontWeight: 600,
              color: '#00d4ff',
              fontSize: '0.9375rem',
              '&:hover': {
                color: '#5ee7ff',
                textDecoration: 'underline',
              }
            }}
          >
            Create Account
          </Link>
        </Typography>
      </Box>

      <AlertDialog
        open={!!error}
        handleClose={() => setError('')}
        title="Login Failed"
        message={error}
        showCancel={false}
      />
    </Paper>
  );
};

export default LoginForm;
