import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { fetchClients } from '../../store/slices/trainerSlice';
import '../../config/chartConfig';

// Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

const Progress = () => {
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('weight');
  const dispatch = useDispatch();
  const { clients, loading } = useSelector((state) => state.trainer);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Progress',
        data: [65, 67, 66, 68],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Client Progress Over Time',
      },
    },
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Client Progress
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Client</InputLabel>
            <Select
              value={selectedClient}
              label="Select Client"
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              {clients?.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  {`${client.profile.firstName} ${client.profile.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Metric</InputLabel>
            <Select
              value={selectedMetric}
              label="Select Metric"
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <MenuItem value="weight">Weight</MenuItem>
              <MenuItem value="bodyFat">Body Fat %</MenuItem>
              <MenuItem value="strength">Strength</MenuItem>
              <MenuItem value="endurance">Endurance</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Stats
              </Typography>
              <Box>
                <Typography color="textSecondary">Weight: 68 kg</Typography>
                <Typography color="textSecondary">Body Fat: 18%</Typography>
                <Typography color="textSecondary">Strength Index: 120</Typography>
                <Typography color="textSecondary">Endurance Score: 85</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Goals
              </Typography>
              <Box>
                <Typography color="textSecondary">Target Weight: 65 kg</Typography>
                <Typography color="textSecondary">Target Body Fat: 15%</Typography>
                <Typography color="textSecondary">Target Strength: 150</Typography>
                <Typography color="textSecondary">Target Endurance: 90</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Progress;
