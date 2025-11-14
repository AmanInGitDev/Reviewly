import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, Stack, Divider,
  Paper, Avatar, useTheme, useMediaQuery
} from '@mui/material';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import * as userService from '../../services/userService';

const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        setLoading(true);
        const response = await userService.getAdminDashboardMetrics();
        setMetrics(response);
      } catch (err) {
        console.error('Failed to fetch dashboard metrics:', err);
        setError('Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardMetrics();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: '#ff4444', fontWeight: 600 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  const metricItems = [
    {
      label: 'Total Users',
      value: metrics?.total_users || 0,
      icon: <PeopleIcon sx={{ fontSize: 32 }} />,
      color: '#00d4ff',
      bgGradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0.05) 100%)',
    },
    {
      label: 'Total Stores',
      value: metrics?.total_stores || 0,
      icon: <StorefrontIcon sx={{ fontSize: 32 }} />,
      color: '#ffb800',
      bgGradient: 'linear-gradient(135deg, rgba(255, 184, 0, 0.15) 0%, rgba(255, 184, 0, 0.05) 100%)',
    },
    {
      label: 'Total Ratings',
      value: metrics?.total_submitted_ratings || 0,
      icon: <StarIcon sx={{ fontSize: 32 }} />,
      color: '#b026ff',
      bgGradient: 'linear-gradient(135deg, rgba(176, 38, 255, 0.15) 0%, rgba(176, 38, 255, 0.05) 100%)',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header Section */}
      <Box>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            mb: 1.5, 
            color: '#ffffff', 
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Platform Overview
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#cbd5e1', 
            fontSize: '1rem',
            lineHeight: 1.6,
            maxWidth: '600px',
          }}
        >
          Real-time insights into users, stores, and community engagement metrics.
        </Typography>
      </Box>

      {/* Metrics Section - Vertical Stack Layout */}
      <Stack spacing={3}>
        {metricItems.map((item, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.6) 0%, rgba(45, 27, 78, 0.4) 100%)',
              border: `1px solid ${item.color}40`,
              boxShadow: `0 4px 20px ${item.color}20`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateX(8px)',
                borderColor: `${item.color}80`,
                boxShadow: `0 8px 32px ${item.color}30`,
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 2,
                    background: item.bgGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${item.color}40`,
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ color: item.color }}>
                    {item.icon}
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#94a3b8', 
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      mb: 0.5,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      color: '#ffffff', 
                      fontWeight: 800,
                      fontSize: { xs: '2rem', md: '3rem' },
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    color: item.color,
                    opacity: 0.3,
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 48 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Quick Actions Section */}
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#ffffff', 
            fontWeight: 700,
            mb: 2,
            fontSize: '1.125rem',
          }}
        >
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 2.5,
                background: 'rgba(0, 212, 255, 0.08)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(0, 212, 255, 0.12)',
                  borderColor: 'rgba(0, 212, 255, 0.4)',
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <PeopleIcon sx={{ color: '#00d4ff', fontSize: 24 }} />
                <Typography sx={{ color: '#e0e7ff', fontWeight: 600, fontSize: '0.9375rem' }}>
                  Manage Users
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              sx={{
                p: 2.5,
                background: 'rgba(255, 184, 0, 0.08)',
                border: '1px solid rgba(255, 184, 0, 0.2)',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(255, 184, 0, 0.12)',
                  borderColor: 'rgba(255, 184, 0, 0.4)',
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <StorefrontIcon sx={{ color: '#ffb800', fontSize: 24 }} />
                <Typography sx={{ color: '#e0e7ff', fontWeight: 600, fontSize: '0.9375rem' }}>
                  Manage Stores
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
