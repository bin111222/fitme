import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    useTheme
} from '@mui/material';
import {
    FitnessCenter,
    Timer,
    TrendingUp,
    LocalFireDepartment
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => {
    const theme = useTheme();
    
    return (
        <Paper
            sx={{
                p: 3,
                height: '100%',
                background: `linear-gradient(45deg, ${theme.palette[color].main} 30%, ${theme.palette[color].light} 90%)`,
                color: theme.palette[color].contrastText
            }}
            elevation={3}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                        {value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    width: 48,
                    height: 48
                }}>
                    {icon}
                </Box>
            </Box>
        </Paper>
    );
};

const WorkoutStats = ({ stats }) => {
    if (!stats) return null;

    const {
        totalWorkouts = 0,
        totalDuration = 0,
        completionRate = 0,
        caloriesBurned = 0
    } = stats;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Total Workouts"
                    value={totalWorkouts}
                    icon={<FitnessCenter sx={{ fontSize: 24, color: 'inherit' }} />}
                    color="primary"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Total Minutes"
                    value={`${totalDuration} min`}
                    icon={<Timer sx={{ fontSize: 24, color: 'inherit' }} />}
                    color="secondary"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Completion Rate"
                    value={`${Math.round(completionRate)}%`}
                    icon={<TrendingUp sx={{ fontSize: 24, color: 'inherit' }} />}
                    color="success"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Calories Burned"
                    value={`${caloriesBurned} kcal`}
                    icon={<LocalFireDepartment sx={{ fontSize: 24, color: 'inherit' }} />}
                    color="error"
                />
            </Grid>
        </Grid>
    );
};

export default WorkoutStats;
