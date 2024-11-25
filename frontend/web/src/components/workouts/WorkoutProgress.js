import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Slider,
    CircularProgress,
    Alert
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { logWorkoutProgress } from '../../store/slices/workoutSlice';

const WorkoutProgress = ({ open, onClose, workout }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(() => ({
        exercises: workout?.exercises?.map(exercise => ({
            ...exercise,
            completed: false,
            actualSets: exercise.sets,
            actualReps: exercise.reps,
            actualWeight: exercise.weight,
            intensity: 5,
            notes: ''
        })) || []
    }));

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const progressData = {
                ...formData,
                date: new Date(),
                workoutId: workout._id
            };

            await dispatch(logWorkoutProgress({
                workoutId: workout._id,
                progressData
            })).unwrap();

            onClose();
        } catch (err) {
            setError(err.message || 'Failed to log workout progress');
        } finally {
            setLoading(false);
        }
    };

    const intensityMarks = [
        { value: 1, label: 'Very Easy' },
        { value: 3, label: 'Easy' },
        { value: 5, label: 'Moderate' },
        { value: 7, label: 'Hard' },
        { value: 10, label: 'Very Hard' }
    ];

    if (!workout) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Log Workout Progress</DialogTitle>
                <DialogContent dividers>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Typography variant="h6" gutterBottom>
                        {workout.name} - {workout.type}
                    </Typography>

                    {formData.exercises.map((exercise, index) => (
                        <Box key={index} sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={exercise.completed}
                                                onChange={(e) => handleExerciseChange(index, 'completed', e.target.checked)}
                                                color="success"
                                            />
                                        }
                                        label={<Typography variant="subtitle1">{exercise.name}</Typography>}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Actual Sets"
                                        type="number"
                                        value={exercise.actualSets}
                                        onChange={(e) => handleExerciseChange(index, 'actualSets', e.target.value)}
                                        helperText={`Target: ${exercise.sets} sets`}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Actual Reps"
                                        type="number"
                                        value={exercise.actualReps}
                                        onChange={(e) => handleExerciseChange(index, 'actualReps', e.target.value)}
                                        helperText={`Target: ${exercise.reps} reps`}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Actual Weight (lbs)"
                                        type="number"
                                        value={exercise.actualWeight}
                                        onChange={(e) => handleExerciseChange(index, 'actualWeight', e.target.value)}
                                        helperText={`Target: ${exercise.weight} lbs`}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography gutterBottom>Intensity Level</Typography>
                                    <Slider
                                        value={exercise.intensity}
                                        onChange={(_, value) => handleExerciseChange(index, 'intensity', value)}
                                        min={1}
                                        max={10}
                                        step={1}
                                        marks={intensityMarks}
                                        valueLabelDisplay="auto"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Notes"
                                        multiline
                                        rows={2}
                                        value={exercise.notes}
                                        onChange={(e) => handleExerciseChange(index, 'notes', e.target.value)}
                                        placeholder="How did this exercise feel? Any challenges?"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        {loading ? 'Saving...' : 'Save Progress'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default WorkoutProgress;
