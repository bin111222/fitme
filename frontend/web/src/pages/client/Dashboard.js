import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Button,
} from '@mui/material';
import {
  FitnessCenter as WorkoutIcon,
  Restaurant as NutritionIcon,
  Event as ScheduleIcon,
  TrendingUp as ProgressIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const todaysWorkout = {
    name: 'Upper Body Strength',
    completed: 2,
    total: 5,
    nextExercise: 'Bench Press',
  };

  const nutritionProgress = {
    calories: {
      consumed: 1200,
      target: 2000,
    },
    protein: {
      consumed: 80,
      target: 150,
    },
    water: {
      consumed: 1.5,
      target: 3,
    },
  };

  const nextSession = {
    date: new Date('2024-01-21T10:00:00'),
    type: 'Training Session',
    trainer: 'John Smith',
  };

  const progressStats = {
    weight: {
      current: 75,
      change: -2,
      unit: 'kg',
    },
    bodyFat: {
      current: 18,
      change: -1.5,
      unit: '%',
    },
    strength: {
      current: 80,
      change: 5,
      unit: 'kg',
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome Back!
      </Typography>

      <Grid container spacing={3}>
        {/* Today's Workout */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <WorkoutIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Today's Workout</Typography>
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                {todaysWorkout.name}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography color="textSecondary" gutterBottom>
                  Progress: {todaysWorkout.completed}/{todaysWorkout.total} exercises
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(todaysWorkout.completed / todaysWorkout.total) * 100}
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>
              <Typography color="textSecondary">
                Next up: {todaysWorkout.nextExercise}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/client/workouts')}
                sx={{ mt: 2 }}
              >
                Continue Workout
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Nutrition Progress */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <NutritionIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Nutrition Progress</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Calories: {nutritionProgress.calories.consumed}/{nutritionProgress.calories.target} kcal
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(nutritionProgress.calories.consumed / nutritionProgress.calories.target) * 100}
                  sx={{ height: 8, borderRadius: 5, mb: 1 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Protein: {nutritionProgress.protein.consumed}/{nutritionProgress.protein.target}g
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(nutritionProgress.protein.consumed / nutritionProgress.protein.target) * 100}
                  sx={{ height: 8, borderRadius: 5, mb: 1 }}
                />
              </Box>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Water: {nutritionProgress.water.consumed}/{nutritionProgress.water.target}L
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(nutritionProgress.water.consumed / nutritionProgress.water.target) * 100}
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Next Session */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <ScheduleIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Next Session</Typography>
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                {nextSession.type}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {nextSession.date.toLocaleString()}
              </Typography>
              <Typography color="textSecondary">
                with {nextSession.trainer}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/client/schedule')}
                sx={{ mt: 2 }}
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Progress Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <ProgressIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Progress Overview</Typography>
              </Box>
              <Grid container spacing={2}>
                {Object.entries(progressStats).map(([key, stat]) => (
                  <Grid item xs={4} key={key}>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {key}
                    </Typography>
                    <Typography variant="body1" align="center">
                      {stat.current}{stat.unit}
                    </Typography>
                    <Typography
                      color={stat.change >= 0 ? 'success.main' : 'error.main'}
                      variant="body2"
                      align="center"
                    >
                      {stat.change >= 0 ? '+' : ''}{stat.change}{stat.unit}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/client/progress')}
                sx={{ mt: 2, width: '100%' }}
              >
                View Full Progress
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
