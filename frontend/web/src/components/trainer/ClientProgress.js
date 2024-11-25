import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import ProgressChart from '../dashboard/ProgressChart';

const ClientProgress = ({ client, workouts, nutritionPlans }) => {
  const getWorkoutData = () => {
    const labels = workouts
      .slice(-5)
      .map((workout) => new Date(workout.date).toLocaleDateString());
    const data = workouts.slice(-5).map((workout) => workout.exercises.length);
    return { labels, data };
  };

  const getNutritionData = () => {
    const labels = nutritionPlans
      .slice(-5)
      .map((plan) => new Date(plan.startDate).toLocaleDateString());
    const data = nutritionPlans
      .slice(-5)
      .map((plan) => plan.dailyCalorieTarget);
    return { labels, data };
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Workout Progress
            </Typography>
            <ProgressChart
              title="Exercises per Workout"
              {...getWorkoutData()}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Nutrition Progress
            </Typography>
            <ProgressChart
              title="Daily Calorie Target"
              {...getNutritionData()}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ClientProgress; 