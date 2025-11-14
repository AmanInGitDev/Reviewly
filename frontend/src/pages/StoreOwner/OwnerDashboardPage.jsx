import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Card, CardContent, 
  Alert, Stack, Divider, Paper, Chip, Rating
} from '@mui/material';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import StarIcon from '@mui/icons-material/Star';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as storeService from '../../services/storeService';
import { useAuth } from '../../context/AuthContext';

const OwnerDashboardPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOwnerDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await storeService.getStoreOwnerDashboard();
        setDashboardData(response);
      } catch (err) {
        console.error('Failed to fetch owner dashboard:', err);
        setError(err.response?.data?.message || 'Failed to load owner dashboard.');
      } finally {
        setLoading(false);
      }
    };
    if (user && user.role === 'Store Owner') {
      fetchOwnerDashboard();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          sx={{ 
            background: 'rgba(255, 68, 68, 0.1)',
            border: '1px solid rgba(255, 68, 68, 0.3)',
            color: '#ff4444',
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#a5b4fc' }}>
          No dashboard data available for your stores.
        </Typography>
      </Box>
    );
  }

  const averageRating = typeof dashboardData.overall_average_rating_of_owned_stores === 'number'
    ? dashboardData.overall_average_rating_of_owned_stores.toFixed(2)
    : 'N/A';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
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
          Store Performance
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
          Track ratings and customer feedback for your stores.
        </Typography>
      </Box>

      {/* Average Rating Card */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.6) 0%, rgba(45, 27, 78, 0.4) 100%)',
          border: '1px solid rgba(255, 184, 0, 0.3)',
          boxShadow: '0 4px 20px rgba(255, 184, 0, 0.15)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.2) 0%, rgba(255, 184, 0, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255, 184, 0, 0.4)',
              }}
            >
              <StarIcon sx={{ fontSize: 40, color: '#ffb800' }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#94a3b8', 
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  mb: 1,
                }}
              >
                Overall Average Rating
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: '#ffffff', 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {averageRating}
              </Typography>
              {averageRating !== 'N/A' && (
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                  <Rating 
                    value={parseFloat(averageRating)} 
                    readOnly 
                    precision={0.1}
                    size="small"
                    sx={{
                      '& .MuiRating-iconFilled': { color: '#ffb800' },
                    }}
                  />
                </Stack>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Stores List */}
      {dashboardData?.owner_stores?.length > 0 && (
        <Card
          elevation={0}
          sx={{
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.6) 0%, rgba(45, 27, 78, 0.4) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 212, 255, 0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <StorefrontIcon sx={{ color: '#00d4ff', fontSize: 28 }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#ffffff', 
                  fontWeight: 700,
                  fontSize: '1.125rem',
                }}
              >
                Your Stores
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {dashboardData.owner_stores.map((store, index) => (
                <React.Fragment key={store.id}>
                  <Paper
                    sx={{
                      p: 2.5,
                      background: 'rgba(0, 212, 255, 0.05)',
                      border: '1px solid rgba(0, 212, 255, 0.15)',
                      borderRadius: 2,
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#ffffff', 
                          fontWeight: 600,
                          fontSize: '1rem',
                        }}
                      >
                        {store.name}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOnIcon sx={{ fontSize: 16, color: '#a5b4fc' }} />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#a5b4fc',
                            fontSize: '0.875rem',
                          }}
                        >
                          {store.address}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Chip
                          label={`Rating: ${typeof store.average_rating === 'number' ? store.average_rating.toFixed(2) : 'N/A'}`}
                          size="small"
                          sx={{
                            background: 'rgba(255, 184, 0, 0.15)',
                            border: '1px solid rgba(255, 184, 0, 0.3)',
                            color: '#ffb800',
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Paper>
                  {index < dashboardData.owner_stores.length - 1 && (
                    <Divider sx={{ borderColor: 'rgba(0, 212, 255, 0.1)' }} />
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Users Who Rated */}
      {dashboardData?.users_who_rated?.length > 0 && (
        <Card
          elevation={0}
          sx={{
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(21, 25, 50, 0.6) 0%, rgba(45, 27, 78, 0.4) 100%)',
            border: '1px solid rgba(176, 38, 255, 0.2)',
            boxShadow: '0 4px 20px rgba(176, 38, 255, 0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <PeopleIcon sx={{ color: '#b026ff', fontSize: 28 }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#ffffff', 
                  fontWeight: 700,
                  fontSize: '1.125rem',
                }}
              >
                Customer Reviews
              </Typography>
            </Stack>
            <Stack spacing={2}>
              {dashboardData.users_who_rated.map((rating, index) => (
                <React.Fragment key={`${rating.user_id}-${rating.store_id}`}>
                  <Paper
                    sx={{
                      p: 2.5,
                      background: 'rgba(176, 38, 255, 0.05)',
                      border: '1px solid rgba(176, 38, 255, 0.15)',
                      borderRadius: 2,
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            color: '#ffffff', 
                            fontWeight: 600,
                            fontSize: '0.9375rem',
                          }}
                        >
                          {rating.user_name}
                        </Typography>
                        <Chip
                          icon={<StarIcon sx={{ color: '#ffb800', fontSize: 16 }} />}
                          label={`${rating.rating} star${rating.rating !== 1 ? 's' : ''}`}
                          size="small"
                          sx={{
                            background: 'rgba(255, 184, 0, 0.15)',
                            border: '1px solid rgba(255, 184, 0, 0.3)',
                            color: '#ffb800',
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                          }}
                        />
                      </Stack>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#a5b4fc',
                          fontSize: '0.875rem',
                        }}
                      >
                        {rating.user_email}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#94a3b8',
                          fontSize: '0.8125rem',
                          fontStyle: 'italic',
                        }}
                      >
                        Rated "{rating.store_name}"
                      </Typography>
                    </Stack>
                  </Paper>
                  {index < dashboardData.users_who_rated.length - 1 && (
                    <Divider sx={{ borderColor: 'rgba(176, 38, 255, 0.1)' }} />
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {(!dashboardData?.users_who_rated || dashboardData.users_who_rated.length === 0) && (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            background: 'rgba(176, 38, 255, 0.05)',
            border: '1px dashed rgba(176, 38, 255, 0.3)',
            borderRadius: 2,
          }}
        >
          <PeopleIcon sx={{ fontSize: 48, color: '#6366f1', mb: 2, opacity: 0.5 }} />
          <Typography variant="body1" sx={{ color: '#a5b4fc' }}>
            No users have rated your stores yet.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default OwnerDashboardPage;
