import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Box,
    Chip,
    LinearProgress,
    Tooltip,
    Button
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    FitnessCenter,
    Timer,
    CalendarToday,
    TrendingUp
} from '@mui/icons-material';
import { format } from 'date-fns';
import WorkoutProgress from './WorkoutProgress';
import WorkoutProgressChart from './WorkoutProgressChart';

const WorkoutCard = ({ workout, onEdit, onDelete }) => {
    const [openProgress, setOpenProgress] = useState(false);
    const [showChart, setShowChart] = useState(false);

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'success';
        if (progress >= 50) return 'warning';
        return 'error';
    };

    const calculateProgress = () => {
        if (!workout.exercises || workout.exercises.length === 0) return 0;
        const completedExercises = workout.exercises.filter(ex => ex.completed).length;
        return (completedExercises / workout.exercises.length) * 100;
    };

    const progress = calculateProgress();

    return (
        <>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            {workout.name}
                        </Typography>
                        <Chip
                            label={workout.type}
                            color="primary"
                            size="small"
                            icon={<FitnessCenter />}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Timer sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {workout.duration} minutes
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CalendarToday sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {format(new Date(workout.date), 'MMM dd, yyyy')}
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {workout.exercises?.length || 0} Exercises
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Progress
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {Math.round(progress)}%
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            color={getProgressColor(progress)}
                        />
                    </Box>

                    {workout.progressHistory && workout.progressHistory.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Button
                                size="small"
                                startIcon={<TrendingUp />}
                                onClick={() => setShowChart(!showChart)}
                            >
                                {showChart ? 'Hide Progress' : 'Show Progress'}
                            </Button>
                            {showChart && (
                                <WorkoutProgressChart
                                    data={workout.progressHistory}
                                    metric="weight"
                                />
                            )}
                        </Box>
                    )}
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpenProgress(true)}
                    >
                        Log Progress
                    </Button>
                    <Box>
                        <Tooltip title="Edit workout">
                            <IconButton size="small" onClick={onEdit} color="primary">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete workout">
                            <IconButton size="small" onClick={onDelete} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardActions>
            </Card>

            <WorkoutProgress
                open={openProgress}
                onClose={() => setOpenProgress(false)}
                workout={workout}
            />
        </>
    );
};

export default WorkoutCard;
