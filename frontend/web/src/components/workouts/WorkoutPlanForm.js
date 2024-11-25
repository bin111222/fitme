import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { createWorkoutPlan, updateWorkoutPlan } from '../../store/slices/workoutSlice';

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const initialExercise = {
  name: '',
  sets: '',
  reps: '',
  weight: '',
  notes: '',
  restTime: 60,
};

const WorkoutPlanForm = ({ open, onClose, clientId, initialData = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      schedule: [],
    }
  );
  const [currentDay, setCurrentDay] = useState(0);
  const [currentWorkout, setCurrentWorkout] = useState({
    name: '',
    exercises: [],
    notes: '',
    duration: 60,
  });
  const [currentExercise, setCurrentExercise] = useState(initialExercise);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.schedule.length === 0) newErrors.schedule = 'At least one workout is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (initialData) {
        await dispatch(updateWorkoutPlan({
          clientId,
          planId: initialData._id,
          planData: formData,
        })).unwrap();
      } else {
        await dispatch(createWorkoutPlan({
          clientId,
          planData: formData,
        })).unwrap();
      }
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExerciseChange = (e) => {
    const { name, value } = e.target;
    setCurrentExercise(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkoutChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorkout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addExercise = () => {
    if (!currentExercise.name || !currentExercise.sets || !currentExercise.reps) return;

    setCurrentWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, { ...currentExercise }]
    }));
    setCurrentExercise(initialExercise);
  };

  const removeExercise = (index) => {
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const addWorkoutToSchedule = () => {
    if (!currentWorkout.name || currentWorkout.exercises.length === 0) return;

    setFormData(prev => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        {
          dayOfWeek: currentDay,
          workout: { ...currentWorkout }
        }
      ]
    }));
    setCurrentWorkout({
      name: '',
      exercises: [],
      notes: '',
      duration: 60,
    });
  };

  const removeWorkoutFromSchedule = (index) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {initialData ? 'Edit Workout Plan' : 'Create Workout Plan'}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Plan Details */}
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Plan Title"
                fullWidth
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="startDate"
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={handleChange}
                error={!!errors.startDate}
                helperText={errors.startDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="endDate"
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.endDate}
                onChange={handleChange}
                error={!!errors.endDate}
                helperText={errors.endDate}
              />
            </Grid>

            {/* Workout Schedule */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Workout Schedule
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Day of Week</InputLabel>
                    <Select
                      value={currentDay}
                      onChange={(e) => setCurrentDay(e.target.value)}
                    >
                      {DAYS_OF_WEEK.map((day, index) => (
                        <MenuItem key={index} value={index}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="Workout Name"
                    fullWidth
                    value={currentWorkout.name}
                    onChange={handleWorkoutChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="duration"
                    label="Duration (minutes)"
                    type="number"
                    fullWidth
                    value={currentWorkout.duration}
                    onChange={handleWorkoutChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="notes"
                    label="Workout Notes"
                    fullWidth
                    multiline
                    rows={2}
                    value={currentWorkout.notes}
                    onChange={handleWorkoutChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Exercise Form */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Add Exercises
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="Exercise Name"
                    fullWidth
                    value={currentExercise.name}
                    onChange={handleExerciseChange}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    name="sets"
                    label="Sets"
                    type="number"
                    fullWidth
                    value={currentExercise.sets}
                    onChange={handleExerciseChange}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    name="reps"
                    label="Reps"
                    type="number"
                    fullWidth
                    value={currentExercise.reps}
                    onChange={handleExerciseChange}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    name="weight"
                    label="Weight"
                    type="number"
                    fullWidth
                    value={currentExercise.weight}
                    onChange={handleExerciseChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addExercise}
                  >
                    Add Exercise
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* Exercise List */}
            {currentWorkout.exercises.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Current Exercises
                </Typography>
                <List>
                  {currentWorkout.exercises.map((exercise, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={exercise.name}
                        secondary={`${exercise.sets} sets × ${exercise.reps} reps ${
                          exercise.weight ? `@ ${exercise.weight}kg` : ''
                        }`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeExercise(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addWorkoutToSchedule}
                >
                  Add Workout to Schedule
                </Button>
              </Grid>
            )}

            {/* Schedule List */}
            {formData.schedule.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Current Schedule
                </Typography>
                <List>
                  {formData.schedule.map((scheduleItem, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${DAYS_OF_WEEK[scheduleItem.dayOfWeek]} - ${scheduleItem.workout.name}`}
                        secondary={`${scheduleItem.workout.exercises.length} exercises, ${scheduleItem.workout.duration} minutes`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeWorkoutFromSchedule(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}

            {errors.submit && (
              <Grid item xs={12}>
                <Box color="error.main">{errors.submit}</Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formData.schedule.length === 0}
          >
            {initialData ? 'Update' : 'Create'} Plan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default WorkoutPlanForm;
