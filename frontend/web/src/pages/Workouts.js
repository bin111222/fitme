import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import WorkoutForm from '../components/workouts/WorkoutForm';
import { workouts as workoutsApi } from '../services/api';

const Workouts = () => {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await workoutsApi.getAll();
      setWorkoutsList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setLoading(false);
    }
  };

  const handleCreateWorkout = async (workoutData) => {
    try {
      await workoutsApi.create(workoutData);
      setOpenDialog(false);
      fetchWorkouts();
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const handleUpdateWorkout = async (workoutData) => {
    try {
      await workoutsApi.update(selectedWorkout._id, workoutData);
      setOpenDialog(false);
      setSelectedWorkout(null);
      fetchWorkouts();
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  const handleDeleteWorkout = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await workoutsApi.delete(id);
        fetchWorkouts();
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Workouts</Typography>
        {user.role === 'trainer' && (
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              setSelectedWorkout(null);
              setOpenDialog(true);
            }}
          >
            Create Workout
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {workoutsList.map((workout) => (
          <Grid item xs={12} md={6} key={workout._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {new Date(workout.date).toLocaleDateString()}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {workout.exercises.length} exercises
                </Typography>
                {workout.exercises.map((exercise, index) => (
                  <Typography key={index} variant="body2">
                    {exercise.name} - {exercise.sets}x{exercise.reps}
                  </Typography>
                ))}
              </CardContent>
              {user.role === 'trainer' && (
                <CardActions>
                  <IconButton
                    onClick={() => {
                      setSelectedWorkout(workout);
                      setOpenDialog(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteWorkout(workout._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedWorkout(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedWorkout ? 'Edit Workout' : 'Create Workout'}
        </DialogTitle>
        <DialogContent>
          <WorkoutForm
            initialData={selectedWorkout}
            onSubmit={selectedWorkout ? handleUpdateWorkout : handleCreateWorkout}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Workouts; 