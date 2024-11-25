import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    IconButton,
    Box,
    Typography,
    Divider
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const workoutTypes = [
    'Strength Training',
    'Cardio',
    'HIIT',
    'Yoga',
    'Pilates',
    'CrossFit',
    'Other'
];

const initialExercise = {
    name: '',
    sets: '',
    reps: '',
    weight: '',
    duration: '',
    notes: ''
};

const WorkoutForm = ({ open, onClose, onSubmit, workout = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Strength Training',
        date: new Date(),
        duration: '',
        notes: '',
        exercises: [{ ...initialExercise }]
    });

    useEffect(() => {
        if (workout) {
            setFormData({
                ...workout,
                date: new Date(workout.date)
            });
        } else {
            setFormData({
                name: '',
                type: 'Strength Training',
                date: new Date(),
                duration: '',
                notes: '',
                exercises: [{ ...initialExercise }]
            });
        }
    }, [workout]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            date
        }));
    };

    const handleExerciseChange = (index, field, value) => {
        const newExercises = [...formData.exercises];
        newExercises[index] = {
            ...newExercises[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            exercises: newExercises
        }));
    };

    const addExercise = () => {
        setFormData(prev => ({
            ...prev,
            exercises: [...prev.exercises, { ...initialExercise }]
        }));
    };

    const removeExercise = (index) => {
        const newExercises = formData.exercises.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            exercises: newExercises
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {workout ? 'Edit Workout' : 'Create New Workout'}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Workout Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                select
                                label="Workout Type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                {workoutTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Workout Date"
                                    value={formData.date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} fullWidth required />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Duration (minutes)"
                                name="duration"
                                type="number"
                                value={formData.duration}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Notes"
                                name="notes"
                                multiline
                                rows={2}
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">Exercises</Typography>
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={addExercise}
                                    color="primary"
                                >
                                    Add Exercise
                                </Button>
                            </Box>
                            {formData.exercises.map((exercise, index) => (
                                <Box key={index} sx={{ mb: 3 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12}>
                                            <Divider>Exercise {index + 1}</Divider>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Exercise Name"
                                                value={exercise.name}
                                                onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                fullWidth
                                                label="Sets"
                                                type="number"
                                                value={exercise.sets}
                                                onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                fullWidth
                                                label="Reps"
                                                type="number"
                                                value={exercise.reps}
                                                onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                fullWidth
                                                label="Weight (lbs)"
                                                type="number"
                                                value={exercise.weight}
                                                onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                fullWidth
                                                label="Duration (min)"
                                                type="number"
                                                value={exercise.duration}
                                                onChange={(e) => handleExerciseChange(index, 'duration', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={10} sm={5}>
                                            <TextField
                                                fullWidth
                                                label="Notes"
                                                value={exercise.notes}
                                                onChange={(e) => handleExerciseChange(index, 'notes', e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={2} sm={1}>
                                            <IconButton
                                                color="error"
                                                onClick={() => removeExercise(index)}
                                                disabled={formData.exercises.length === 1}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {workout ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default WorkoutForm;