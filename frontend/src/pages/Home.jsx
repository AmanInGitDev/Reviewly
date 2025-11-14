import React from 'react';
import { 
  Box, Typography, Button, Container, Grid, Card, CardContent, 
  Avatar, Stack, Chip, Paper, useTheme, useMediaQuery, Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Nav/Navbar';
import { useAuth } from '../context/AuthContext';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'System Administrator') return '/admin/dashboard';
    if (user.role === 'Store Owner') return '/owner/dashboard';
    if (user.role === 'Normal User') return '/stores';
    return '/';
  };

  const mainFeatures = [
    {
      icon: <BusinessIcon sx={{ fontSize: 32 }} />,
      title: 'Discover Stores',
      description: 'Navigate through an extensive directory of stores with advanced filtering and search capabilities.',
      color: '#00d4ff',
      gradient: 'linear-gradient(135deg, #00d4ff 0%, #5ee7ff 100%)',
    },
    {
      icon: <StarIcon sx={{ fontSize: 32 }} />,
      title: 'Rate & Review',
      description: 'Share authentic experiences and help the community make informed decisions.',
      color: '#ffb800',
      gradient: 'linear-gradient(135deg, #ffb800 0%, #ffcc33 100%)',
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 32 }} />,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights and performance metrics for store owners and administrators.',
      color: '#b026ff',
      gradient: 'linear-gradient(135deg, #b026ff 0%, #d966ff 100%)',
    },
  ];


  const benefits = [
    { icon: <SecurityIcon />, text: 'Enterprise-grade security' },
    { icon: <SpeedIcon />, text: 'Lightning-fast performance' },
    { icon: <VerifiedUserIcon />, text: 'Verified user system' },
    { icon: <PeopleIcon />, text: 'Community-driven platform' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Hero Section - Split Layout */}
      <Box sx={{ 
        background: 'linear-gradient(180deg, #0a0e27 0%, #151932 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: '70vh', md: '85vh' },
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(176, 38, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }
      }}>
        <Container sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Side - Content */}
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 4 }}>
                <Chip 
                  label="SPACE RATING PLATFORM" 
                  sx={{ 
                    mb: 3,
                    background: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    color: '#00d4ff',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    height: 32,
                  }}
                />
                <Typography 
                  variant={isMobile ? 'h2' : 'h1'} 
                  component="h1" 
                  sx={{ 
                    fontWeight: 900,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#e0e7ff',
                  }}
                >
                  Elevate Your{' '}
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                    }}
                  >
                    Store Experience
                  </Box>
                </Typography>
                <Typography 
                  variant="h6" 
                  component="p" 
                  sx={{ 
                    mb: 4,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    lineHeight: 1.7,
                    color: '#a5b4fc',
                    maxWidth: '600px',
                    fontWeight: 400,
                  }}
                >
                  Discover, rate, and share experiences with stores. Join a community-driven platform designed for transparency and quality.
                </Typography>
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  sx={{ mb: 6 }}
                >
                  {isAuthenticated ? (
                    <Button
                      variant="contained"
                      size="large"
                      component={Link}
                      to={getDashboardLink()}
                      sx={{ 
                        py: 1.75, 
                        px: 5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                        boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
                        borderRadius: 2,
                        textTransform: 'none',
                        letterSpacing: '0.05em',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5ee7ff 0%, #d966ff 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 32px rgba(0, 212, 255, 0.4)',
                        },
                      }}
                    >
                      Access Dashboard
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/signup"
                        sx={{ 
                          py: 1.75, 
                          px: 5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                          boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
                          borderRadius: 2,
                          textTransform: 'none',
                          letterSpacing: '0.05em',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5ee7ff 0%, #d966ff 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.4)',
                          },
                        }}
                      >
                        Get Started Free
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        component={Link}
                        to="/login"
                        sx={{ 
                          py: 1.75, 
                          px: 5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#00d4ff',
                          borderColor: 'rgba(0, 212, 255, 0.4)',
                          borderRadius: 2,
                          textTransform: 'none',
                          letterSpacing: '0.05em',
                          '&:hover': {
                            borderColor: '#00d4ff',
                            background: 'rgba(0, 212, 255, 0.08)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
                          },
                        }}
                      >
                        Sign In
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>
            </Grid>

            {/* Right Side - Feature Cards */}
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                {mainFeatures.map((feature, index) => (
                  <Card 
                    key={index}
                    sx={{ 
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.6) 0%, rgba(45, 27, 78, 0.4) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(0, 212, 255, 0.15)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      borderRadius: 3,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: feature.gradient,
                        opacity: 0,
                        transition: 'opacity 0.3s',
                      },
                      '&:hover': {
                        transform: 'translateX(8px)',
                        borderColor: `rgba(${feature.color === '#00d4ff' ? '0, 212, 255' : feature.color === '#ffb800' ? '255, 184, 0' : '176, 38, 255'}, 0.4)`,
                        boxShadow: `0 12px 40px rgba(${feature.color === '#00d4ff' ? '0, 212, 255' : feature.color === '#ffb800' ? '255, 184, 0' : '176, 38, 255'}, 0.2)`,
                        '&::before': {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <Stack direction="row" spacing={3} alignItems="flex-start">
                      <Avatar 
                        sx={{ 
                          width: 56,
                          height: 56,
                          background: feature.gradient,
                          boxShadow: `0 4px 16px ${feature.color}40`,
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700,
                            mb: 1,
                            color: '#e0e7ff',
                            fontSize: '1.125rem',
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#a5b4fc',
                            lineHeight: 1.7,
                            fontSize: '0.9375rem',
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Bar */}
      <Box sx={{ 
        background: 'rgba(10, 14, 39, 0.6)',
        borderTop: '1px solid rgba(0, 212, 255, 0.15)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.15)',
        py: 4,
      }}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {benefits.map((benefit, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <Box
                    sx={{
                      color: '#00d4ff',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#e0e7ff',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    {benefit.text}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ 
        background: 'linear-gradient(180deg, #151932 0%, #0a0e27 100%)',
        py: { xs: 8, md: 12 },
      }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                color: '#e0e7ff',
                fontSize: { xs: '2rem', md: '2.75rem' },
                letterSpacing: '-0.02em',
              }}
            >
              How It Works
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#a5b4fc',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: '1.125rem',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Three simple steps to start rating and discovering stores in your area
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up in seconds with your email and start exploring immediately.' },
              { step: '02', title: 'Browse Stores', desc: 'Search and filter through our extensive directory of verified stores.' },
              { step: '03', title: 'Rate & Share', desc: 'Submit your ratings and help others make informed decisions.' },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.6) 0%, rgba(45, 27, 78, 0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 212, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  borderRadius: 3,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'rgba(0, 212, 255, 0.4)',
                    boxShadow: '0 16px 48px rgba(0, 212, 255, 0.2)',
                  },
                }}>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      fontWeight: 900,
                      color: 'rgba(0, 212, 255, 0.2)',
                      mb: 2,
                      fontSize: '4rem',
                      lineHeight: 1,
                    }}
                  >
                    {item.step}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      color: '#e0e7ff',
                      fontSize: '1.5rem',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#a5b4fc',
                      lineHeight: 1.7,
                      fontSize: '1rem',
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(26, 31, 58, 0.9) 100%)',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 212, 255, 0.2)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(176, 38, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        },
      }}>
        <Container sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              mb: 3,
              color: '#e0e7ff',
              fontSize: { xs: '2rem', md: '2.75rem' },
              letterSpacing: '-0.02em',
            }}
          >
            Ready to Transform Your Store Experience?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 6,
              color: '#a5b4fc',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '1.125rem',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Join thousands of users who trust Reviewly for authentic store ratings and reviews.
          </Typography>
          
          {!isAuthenticated && (
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/signup"
                sx={{ 
                  py: 1.75, 
                  px: 6,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                  boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
                  borderRadius: 2,
                  textTransform: 'none',
                  letterSpacing: '0.05em',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5ee7ff 0%, #d966ff 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 32px rgba(0, 212, 255, 0.4)',
                  },
                }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/login"
                sx={{ 
                  py: 1.75, 
                  px: 6,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#00d4ff',
                  borderColor: 'rgba(0, 212, 255, 0.4)',
                  borderRadius: 2,
                  textTransform: 'none',
                  letterSpacing: '0.05em',
                  '&:hover': {
                    borderColor: '#00d4ff',
                    background: 'rgba(0, 212, 255, 0.08)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
                  },
                }}
              >
                View Demo
              </Button>
            </Stack>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ 
        py: 5, 
        background: 'linear-gradient(180deg, rgba(10, 14, 39, 0.98) 0%, #0a0e27 100%)',
        borderTop: '1px solid rgba(0, 212, 255, 0.15)',
        color: '#e0e7ff',
      }}>
        <Container>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(135deg, #00d4ff 0%, #b026ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.5rem',
                letterSpacing: '0.05em',
              }}
            >
              REVIEWLY
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#a5b4fc',
                mb: 3,
                fontSize: '0.9375rem',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Professional store rating and review platform for businesses and customers.
            </Typography>
            <Divider sx={{ borderColor: 'rgba(0, 212, 255, 0.15)', mb: 3, maxWidth: 400, mx: 'auto' }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#6366f1',
                fontSize: '0.8125rem',
                letterSpacing: '0.05em',
              }}
            >
              &copy; {new Date().getFullYear()} Reviewly. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
