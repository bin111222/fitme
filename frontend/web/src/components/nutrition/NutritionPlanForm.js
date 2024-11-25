import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Grid,
  Typography,
  Paper,
  MenuItem,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import ClientSelect from '../shared/ClientSelect';

const NutritionPlanForm = ({ initialData, onSubmit, loading }) => {
  const [plan, setPlan] = useState(initialData || {
    client: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    meals: [
      {
        name: 'Breakfast',
        time: '08:00',
        foods: [{ name: '', portion: '', calories: '', protein: '', carbs: '', fats: '' }],
      },
    ],
    dailyCalorieTarget: '',
    macroTargets: {
      protein: '',
      carbs: '',
      fats: '',
    },
    restrictions: '',
    notes: '',
  });

  const handleMealChange = (mealIndex, field, value) => {
    const newMeals = [...plan.meals];
    newMeals[mealIndex] = { ...newMeals[mealIndex], [field]: value };
    setPlan({ ...plan, meals: newMeals });
  };

  const handleFoodChange = (mealIndex, foodIndex, field, value) => {
    const newMeals = [...plan.meals];
    newMeals[mealIndex].foods[foodIndex] = {
      ...newMeals[mealIndex].foods[foodIndex],
      [field]: value,
    };
    setPlan({ ...plan, meals: newMeals });
  };

  const addMeal = () => {
    setPlan({
      ...plan,
      meals: [
        ...plan.meals,
        {
          name: '',
          time: '',
          foods: [{ name: '', portion: '', calories: '', protein: '', carbs: '', fats: '' }],
        },
      ],
    });
  };

  const addFood = (mealIndex) => {
    const newMeals = [...plan.meals];
    newMeals[mealIndex].foods.push({
      name: '',
      portion: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });
    setPlan({ ...plan, meals: newMeals });
  };

  const removeMeal = (mealIndex) => {
    const newMeals = plan.meals.filter((_, index) => index !== mealIndex);
    setPlan({ ...plan, meals: newMeals });
  };

  const removeFood = (mealIndex, foodIndex) => {
    const newMeals = [...plan.meals];
    newMeals[mealIndex].foods = newMeals[mealIndex].foods.filter(
      (_, index) => index !== foodIndex
    );
    setPlan({ ...plan, meals: newMeals });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(plan);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ClientSelect
            value={plan.client}
            onChange={(client) => setPlan({ ...plan, client: client?._id })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={plan.startDate}
            onChange={(e) => setPlan({ ...plan, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            value={plan.endDate}
            onChange={(e) => setPlan({ ...plan, endDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Daily Calorie Target"
            type="number"
            value={plan.dailyCalorieTarget}
            onChange={(e) => setPlan({ ...plan, dailyCalorieTarget: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Protein (g)"
                type="number"
                value={plan.macroTargets.protein}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    macroTargets: { ...plan.macroTargets, protein: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Carbs (g)"
                type="number"
                value={plan.macroTargets.carbs}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    macroTargets: { ...plan.macroTargets, carbs: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Fats (g)"
                type="number"
                value={plan.macroTargets.fats}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    macroTargets: { ...plan.macroTargets, fats: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Meals
          </Typography>
          {plan.meals.map((meal, mealIndex) => (
            <Paper key={mealIndex} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Meal Name"
                    value={meal.name}
                    onChange={(e) => handleMealChange(mealIndex, 'name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Time"
                    type="time"
                    value={meal.time}
                    onChange={(e) => handleMealChange(mealIndex, 'time', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton color="error" onClick={() => removeMeal(mealIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>

                {meal.foods.map((food, foodIndex) => (
                  <Grid item xs={12} key={foodIndex}>
                    <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label="Food Name"
                            value={food.name}
                            onChange={(e) =>
                              handleFoodChange(mealIndex, foodIndex, 'name', e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <TextField
                            fullWidth
                            label="Portion"
                            value={food.portion}
                            onChange={(e) =>
                              handleFoodChange(mealIndex, foodIndex, 'portion', e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={6} sm={1}>
                          <TextField
                            fullWidth
                            label="Calories"
                            type="number"
                            value={food.calories}
                            onChange={(e) =>
                              handleFoodChange(mealIndex, foodIndex, 'calories', e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={4} sm={1}>
                          <TextField
                            fullWidth
                            label="Protein"
                            type="number"
                            value={food.protein}
                            onChange={(e) =>
                              handleFoodChange(mealIndex, foodIndex, 'protein', e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={4} sm={1}>
                          <TextField
                            fullWidth
                            label="Carbs"
                            type="number"
                            value={food.carbs}
                            onChange={(e) =>
                              handleFoodChange(mealIndex, foodIndex, 'carbs', e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={4} sm={1}>
                          <TextField
                            fullWidth
                            label="Fats"
                            type="number"
                            value={food.fats}
                            onChange={(e) =>
                              handleFoodChange(mealIndex, foodIndex, 'fats', e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <IconButton
                            color="error"
                            onClick={() => removeFood(mealIndex, foodIndex)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => addFood(mealIndex)}
                    variant="outlined"
                    size="small"
                  >
                    Add Food
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button startIcon={<AddIcon />} onClick={addMeal} variant="outlined">
            Add Meal
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dietary Restrictions"
            multiline
            rows={2}
            value={plan.restrictions}
            onChange={(e) => setPlan({ ...plan, restrictions: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={3}
            value={plan.notes}
            onChange={(e) => setPlan({ ...plan, notes: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={loading}>
            {initialData ? 'Update Plan' : 'Create Plan'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NutritionPlanForm; 