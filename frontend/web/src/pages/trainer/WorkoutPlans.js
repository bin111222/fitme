import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { fetchClients } from '../../store/slices/trainerSlice';
import WorkoutPlanList from '../../components/workouts/WorkoutPlanList';

const WorkoutPlans = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.trainer);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (clients.length > 0 && !selectedClient) {
      setSelectedClient(clients[0]._id);
    }
  }, [clients, selectedClient]);

  const handleClientChange = (event, newValue) => {
    setSelectedClient(newValue);
  };

  if (loading && !clients.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
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
        Workout Plans
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedClient}
          onChange={handleClientChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="client tabs"
        >
          {clients.map((client) => (
            <Tab
              key={client._id}
              value={client._id}
              label={`${client.firstName} ${client.lastName}`}
            />
          ))}
        </Tabs>
      </Paper>

      {selectedClient && <WorkoutPlanList clientId={selectedClient} />}
    </Box>
  );
};

export default WorkoutPlans;
