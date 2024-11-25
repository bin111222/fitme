import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Grid,
    CircularProgress,
    Tabs,
    Tab,
    MenuItem,
    TextField
} from '@mui/material';
import { Add as AddIcon, TrendingUp } from '@mui/icons-material';
import WorkoutCard from '../../components/workouts/WorkoutCard';
import WorkoutForm from '../../components/workouts/WorkoutForm';
import WorkoutStats from '../../components/workouts/WorkoutStats';
import WorkoutProgressChart from '../../components/workouts/WorkoutProgressChart';
import { 
    fetchWorkouts,
    fetchWorkoutStats,
    createWorkout,
    updateWorkout,
    deleteWorkout 
} from '../../store/slices/workoutSlice';

const WorkoutLog = () => {
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [currentView, setCurrentView] = useState(0);
    const [selectedMetric, setSelectedMetric] = useState('weight');
    const [filterType, setFilterType] = useState('all');
    
    const { workouts, loading, error, workoutStats, statsLoading } = useSelector(
        (state) => state.workout
    );
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(fetchWorkouts({ clientId: user._id }));
            dispatch(fetchWorkoutStats({ clientId: user._id }));
        }
    }, [dispatch, user]);

    const handleCreateWorkout = async (workoutData) => {
        await dispatch(createWorkout(workoutData));
        setOpenForm(false);
    };

    const handleUpdateWorkout = async (workoutData) => {
        await dispatch(updateWorkout({ 
            workoutId: selectedWorkout._id, 
            workoutData 
        }));
        setOpenForm(false);
        setSelectedWorkout(null);
    };

    const handleDeleteWorkout = async (workoutId) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            await dispatch(deleteWorkout(workoutId));
        }
    };

    const handleEditWorkout = (workout) => {
        setSelectedWorkout(workout);
        setOpenForm(true);
    };

    const filteredWorkouts = workouts.filter(workout => {
        if (filterType === 'all') return true;
        return workout.type === filterType;
    });

    const workoutTypes = ['all', 'Strength Training', 'Cardio', 'HIIT', 'Yoga', 'Pilates', 'CrossFit', 'Other'];

    const getProgressData = () => {
        const data = [];
        workouts.forEach(workout => {
            if (workout.progressHistory) {
                data.push(...workout.progressHistory);
            }
        });
        return data.sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    if (error) {
        return (
            <Container>
                <Typography color="error" align="center">
                    Error: {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Workout Log
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenForm(true)}
                    >
                        New Workout
                    </Button>
                </Box>

                <Tabs
                    value={currentView}
                    onChange={(_, newValue) => setCurrentView(newValue)}
                    sx={{ mb: 3 }}
                >
                    <Tab label="Workouts" />
                    <Tab label="Progress" icon={<TrendingUp />} />
                </Tabs>
            </Box>

            {statsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <WorkoutStats stats={workoutStats} />
            )}

            {currentView === 0 ? (
                <>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            select
                            label="Filter by Type"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            sx={{ minWidth: 200 }}
                        >
                            {workoutTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type === 'all' ? 'All Types' : type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Grid container spacing={3}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : filteredWorkouts.length === 0 ? (
                            <Box sx={{ width: '100%', textAlign: 'center', my: 4 }}>
                                <Typography variant="h6" color="textSecondary">
                                    No workouts found. Create your first workout!
                                </Typography>
                            </Box>
                        ) : (
                            filteredWorkouts.map((workout) => (
                                <Grid item xs={12} sm={6} md={4} key={workout._id}>
                                    <WorkoutCard
                                        workout={workout}
                                        onEdit={() => handleEditWorkout(workout)}
                                        onDelete={() => handleDeleteWorkout(workout._id)}
                                    />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </>
            ) : (
                <Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            select
                            label="Metric"
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value)}
                            sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="weight">Weight</MenuItem>
                            <MenuItem value="reps">Repetitions</MenuItem>
                            <MenuItem value="sets">Sets</MenuItem>
                            <MenuItem value="duration">Duration</MenuItem>
                        </TextField>
                    </Box>

                    <Paper sx={{ p: 2 }}>
                        <WorkoutProgressChart
                            data={getProgressData()}
                            metric={selectedMetric}
                        />
                    </Paper>
                </Box>
            )}

            <WorkoutForm
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    setSelectedWorkout(null);
                }}
                onSubmit={selectedWorkout ? handleUpdateWorkout : handleCreateWorkout}
                workout={selectedWorkout}
            />
        </Container>
    );
};

export default WorkoutLog;
