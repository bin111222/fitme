import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { fetchWorkoutPlans, logWorkoutProgress } from '../../store/slices/workoutSlice';

const MyWorkouts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { workoutPlans = [], loading = false, error = null } = useSelector((state) => state.workout || {});
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [openLogDialog, setOpenLogDialog] = useState(false);
  const [exerciseProgress, setExerciseProgress] = useState({});

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchWorkoutPlans({ clientId: user._id }));
    }
  }, [dispatch, user]);

  const handleLogWorkout = (workout) => {
    setSelectedWorkout(workout);
    setExerciseProgress(
      workout.exercises.reduce((acc, exercise) => ({
        ...acc,
        [exercise._id]: {
          completed: false,
          actualSets: exercise.sets,
          actualReps: exercise.reps,
          actualWeight: exercise.weight,
          notes: '',
        },
      }), {})
    );
    setOpenLogDialog(true);
  };

  const handleProgressChange = (exerciseId, field, value) => {
    setExerciseProgress((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: value,
      },
    }));
  };

  const handleSubmitProgress = async () => {
    if (selectedWorkout) {
      const progressData = {
        date: new Date().toISOString(),
        exercises: Object.entries(exerciseProgress).map(([exerciseId, progress]) => ({
          exerciseId,
          ...progress,
        })),
      };

      await dispatch(logWorkoutProgress({
        clientId: user._id,
        planId: selectedWorkout._id,
        progressData,
      }));

      setOpenLogDialog(false);
      setSelectedWorkout(null);
      setExerciseProgress({});
    }
  };

  if (loading && (!workoutPlans || workoutPlans.length === 0)) {
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

  const today = new Date();
  const dayOfWeek = today.getDay();

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Workouts
      </Typography>

      {/* Today's Workouts */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Today's Workouts
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {workoutPlans
          .filter(plan => {
            const startDate = new Date(plan.startDate);
            const endDate = new Date(plan.endDate);
            return (
              today >= startDate &&
              today <= endDate &&
              plan.schedule.some(item => item.dayOfWeek === dayOfWeek)
            );
          })
          .map(plan => (
            <Grid item xs={12} md={6} key={plan._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{plan.title}</Typography>
                  {plan.schedule
                    .filter(item => item.dayOfWeek === dayOfWeek)
                    .map((item, index) => (
                      <Box key={index} sx={{ mt: 2 }}>
                        <Typography variant="subtitle1">
                          {item.workout.name}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Duration: {item.workout.duration} minutes
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AssignmentIcon />}
                          onClick={() => handleLogWorkout(item.workout)}
                          sx={{ mt: 1 }}
                        >
                          Log Workout
                        </Button>
                      </Box>
                    ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* All Workout Plans */}
      <Typography variant="h6" gutterBottom>
        All Workout Plans
      </Typography>
      {workoutPlans.map(plan => (
        <Accordion key={plan._id} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="subtitle1">{plan.title}</Typography>
              <Chip
                size="small"
                label={
                  today < new Date(plan.startDate)
                    ? 'Upcoming'
                    : today > new Date(plan.endDate)
                    ? 'Completed'
                    : 'Active'
                }
                color={
                  today < new Date(plan.startDate)
                    ? 'info'
                    : today > new Date(plan.endDate)
                    ? 'success'
                    : 'primary'
                }
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary" gutterBottom>
              {plan.description}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {plan.schedule.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2">
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][item.dayOfWeek]}
                      </Typography>
                      <Typography variant="body2">
                        {item.workout.name} ({item.workout.duration} min)
                      </Typography>
                      <Box mt={1}>
                        {item.workout.exercises.map((exercise, idx) => (
                          <Typography key={idx} variant="body2" color="textSecondary">
                            • {exercise.name}: {exercise.sets}×{exercise.reps}
                            {exercise.weight ? ` @ ${exercise.weight}kg` : ''}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Progress Logging Dialog */}
      <Dialog open={openLogDialog} onClose={() => setOpenLogDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Log Workout Progress</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {selectedWorkout?.exercises.map((exercise) => (
              <Grid item xs={12} key={exercise._id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">{exercise.name}</Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2">
                          Target: {exercise.sets}×{exercise.reps}
                          {exercise.weight ? ` @ ${exercise.weight}kg` : ''}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Button
                            variant={exerciseProgress[exercise._id]?.completed ? 'contained' : 'outlined'}
                            color="success"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleProgressChange(
                              exercise._id,
                              'completed',
                              !exerciseProgress[exercise._id]?.completed
                            )}
                          >
                            {exerciseProgress[exercise._id]?.completed ? 'Completed' : 'Mark Complete'}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitProgress}
            variant="contained"
            color="primary"
          >
            Save Progress
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyWorkouts;
