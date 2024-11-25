import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Pie } from 'react-chartjs-2';
import '../../config/chartConfig';

const MyNutrition = () => {
  const [openLogDialog, setOpenLogDialog] = useState(false);
  const [mealEntry, setMealEntry] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const nutritionPlan = {
    dailyGoals: {
      calories: 2000,
      protein: 150,
      carbs: 200,
      fats: 65,
    },
    progress: {
      calories: 1200,
      protein: 80,
      carbs: 120,
      fats: 35,
    },
    meals: [
      {
        name: 'Breakfast',
        time: '08:00',
        calories: 400,
        protein: 25,
        carbs: 45,
        fats: 12,
      },
      {
        name: 'Lunch',
        time: '13:00',
        calories: 500,
        protein: 35,
        carbs: 50,
        fats: 15,
      },
    ],
  };

  const handleLogMeal = () => {
    setOpenLogDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenLogDialog(false);
    setMealEntry({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });
  };

  const handleSaveMeal = () => {
    // Save meal logic here
    console.log('Saving meal:', mealEntry);
    handleCloseDialog();
  };

  const macroChartData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        data: [
          nutritionPlan.progress.protein * 4,
          nutritionPlan.progress.carbs * 4,
          nutritionPlan.progress.fats * 9,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const macroChartOptions = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Nutrition
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleLogMeal}
        >
          Log Meal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Daily Progress */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Progress
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Calories: {nutritionPlan.progress.calories}/{nutritionPlan.dailyGoals.calories} kcal
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(nutritionPlan.progress.calories / nutritionPlan.dailyGoals.calories) * 100}
                  sx={{ height: 8, borderRadius: 5, mb: 2 }}
                />
                <Typography variant="body2" gutterBottom>
                  Protein: {nutritionPlan.progress.protein}/{nutritionPlan.dailyGoals.protein}g
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(nutritionPlan.progress.protein / nutritionPlan.dailyGoals.protein) * 100}
                  sx={{ height: 8, borderRadius: 5, mb: 2 }}
                />
                <Typography variant="body2" gutterBottom>
                  Carbs: {nutritionPlan.progress.carbs}/{nutritionPlan.dailyGoals.carbs}g
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(nutritionPlan.progress.carbs / nutritionPlan.dailyGoals.carbs) * 100}
                  sx={{ height: 8, borderRadius: 5, mb: 2 }}
                />
                <Typography variant="body2" gutterBottom>
                  Fats: {nutritionPlan.progress.fats}/{nutritionPlan.dailyGoals.fats}g
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(nutritionPlan.progress.fats / nutritionPlan.dailyGoals.fats) * 100}
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Macro Distribution */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Macro Distribution
              </Typography>
              <Box sx={{ height: 200 }}>
                <Pie data={macroChartData} options={macroChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Meal Log */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Meals
              </Typography>
              <Grid container spacing={2}>
                {nutritionPlan.meals.map((meal, index) => (
                  <Grid item xs={12} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={3}>
                            <Typography variant="subtitle1">{meal.name}</Typography>
                            <Typography color="textSecondary">{meal.time}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={9}>
                            <Grid container spacing={2}>
                              <Grid item xs={3}>
                                <Typography variant="body2">
                                  Calories: {meal.calories}
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="body2">
                                  Protein: {meal.protein}g
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="body2">
                                  Carbs: {meal.carbs}g
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="body2">
                                  Fats: {meal.fats}g
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Log Meal Dialog */}
      <Dialog open={openLogDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Log Meal</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meal Name"
                  value={mealEntry.name}
                  onChange={(e) =>
                    setMealEntry({ ...mealEntry, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Calories"
                  type="number"
                  value={mealEntry.calories}
                  onChange={(e) =>
                    setMealEntry({ ...mealEntry, calories: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Protein (g)"
                  type="number"
                  value={mealEntry.protein}
                  onChange={(e) =>
                    setMealEntry({ ...mealEntry, protein: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Carbs (g)"
                  type="number"
                  value={mealEntry.carbs}
                  onChange={(e) =>
                    setMealEntry({ ...mealEntry, carbs: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fats (g)"
                  type="number"
                  value={mealEntry.fats}
                  onChange={(e) =>
                    setMealEntry({ ...mealEntry, fats: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveMeal} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyNutrition;
