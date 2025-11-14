import React, { useState } from 'react';
import { 
  Box, TextField, Button, Typography, Link, Paper, FormControl, 
  InputLabel, Select, MenuItem, Stack, Divider, useTheme, useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';
import AlertDialog from '../Common/AlertDialog';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'Normal User',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const user = await signup(formData);
      if (user.role === 'Store Owner') {
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
    return <LoadingSpinner message="Creating your account..." />;
  }

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: { xs: 4, sm: 5, md: 6 }, 
        width: '100%',
        maxWidth: 500,
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
          <PersonAddIcon sx={{ fontSize: 32, color: '#0a0e27' }} />
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
          Create Account
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#a5b4fc',
            fontSize: '0.9375rem',
          }}
        >
          Sign up to start rating and discovering stores
        </Typography>
      </Box>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <Stack spacing={2.5}>
          <TextField
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            helperText="20-60 characters"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              '& .MuiInputLabel-root': {
                color: '#a5b4fc',
              },
              '& .MuiFormHelperText-root': {
                color: '#6366f1',
                fontSize: '0.8125rem',
              },
            }}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            helperText="8-16 characters, uppercase + special character"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              '& .MuiInputLabel-root': {
                color: '#a5b4fc',
              },
              '& .MuiFormHelperText-root': {
                color: '#6366f1',
                fontSize: '0.8125rem',
              },
            }}
          />
          <TextField
            required
            fullWidth
            name="address"
            label="Address"
            id="address"
            autoComplete="street-address"
            value={formData.address}
            onChange={handleChange}
            helperText="Maximum 400 characters"
            multiline
            rows={2}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              '& .MuiInputLabel-root': {
                color: '#a5b4fc',
              },
              '& .MuiFormHelperText-root': {
                color: '#6366f1',
                fontSize: '0.8125rem',
              },
            }}
          />
          <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
            <InputLabel id="role-select-label" sx={{ color: '#a5b4fc' }}>Account Type</InputLabel>
            <Select
              labelId="role-select-label"
              id="role"
              name="role"
              value={formData.role}
              label="Account Type"
              onChange={handleChange}
            >
              <MenuItem value="Normal User">Normal User</MenuItem>
              <MenuItem value="Store Owner">Store Owner</MenuItem>
            </Select>
          </FormControl>
          
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Stack>

        <Divider sx={{ my: 4, borderColor: 'rgba(0, 212, 255, 0.15)' }}>
          <Typography variant="body2" sx={{ color: '#6366f1', px: 2, fontSize: '0.8125rem' }}>
            OR
          </Typography>
        </Divider>

        <Typography variant="body2" align="center" sx={{ color: '#a5b4fc', fontSize: '0.9375rem' }}>
          Already have an account?{' '}
          <Link 
            component="button" 
            type="button" 
            onClick={() => navigate('/login')} 
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
            Sign In
          </Link>
        </Typography>
      </Box>

      <AlertDialog
        open={!!error}
        handleClose={() => setError('')}
        title="Signup Failed"
        message={error}
        showCancel={false}
      />
    </Paper>
  );
};

export default SignupForm;
