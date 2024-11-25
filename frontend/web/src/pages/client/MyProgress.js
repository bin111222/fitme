import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import '../../config/chartConfig';

const MyProgress = () => {
  // Sample data - replace with actual data from your backend
  const weightData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Weight (kg)',
        data: [80, 79.5, 78.8, 78.2, 77.5, 77],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const strengthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Bench Press (kg)',
        data: [60, 62.5, 65, 67.5, 70, 72.5],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const goals = [
    {
      name: 'Weight Loss Goal',
      current: 77,
      target: 75,
      unit: 'kg',
    },
    {
      name: 'Bench Press Goal',
      current: 72.5,
      target: 80,
      unit: 'kg',
    },
    {
      name: 'Weekly Workouts',
      current: 3,
      target: 4,
      unit: 'sessions',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Progress
      </Typography>

      {/* Goals Progress */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Goals Progress
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {goals.map((goal, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {goal.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {goal.current} / {goal.target} {goal.unit}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(goal.current / goal.target) * 100}
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weight Progress
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={weightData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: false,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Strength Progress
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line
                  data={strengthData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: false,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyProgress;
