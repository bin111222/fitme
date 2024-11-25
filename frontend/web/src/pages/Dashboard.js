import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  FitnessCenter,
  People,
  TrendingUp,
  Restaurant,
} from '@mui/icons-material';
import StatsCard from '../components/dashboard/StatsCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import { workouts, nutrition } from '../services/api';
import { logout } from '../store/slices/authSlice';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard mounted, auth state:', auth);

    // Check if user is authenticated
    if (!auth.token || !auth.user) {
      console.log('No auth token or user, redirecting to login');
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        console.log('Fetching dashboard data...');
        // In a real app, you'd have an API endpoint for dashboard stats
        // This is just mock data for demonstration
        const mockData = {
          totalWorkouts: 24,
          activeClients: auth.user?.role === 'trainer' ? 8 : null,
          completedSessions: 18,
          nutritionPlanCompliance: 85,
          progressData: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [65, 70, 68, 72],
          },
        };
        
        setStats(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.response?.data?.message || 'Error loading dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [auth, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Welcome, {auth.user?.name}!
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Workouts"
            value={stats.totalWorkouts}
            icon={<FitnessCenter />}
            color="#1976d2"
          />
        </Grid>
        {auth.user?.role === 'trainer' && (
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Active Clients"
              value={stats.activeClients}
              icon={<People />}
              color="#2e7d32"
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Completed Sessions"
            value={stats.completedSessions}
            icon={<TrendingUp />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Nutrition Plan Compliance"
            value={`${stats.nutritionPlanCompliance}%`}
            icon={<Restaurant />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Progress Overview
        </Typography>
        <ProgressChart data={stats.progressData} />
      </Box>
    </Box>
  );
};

export default Dashboard;