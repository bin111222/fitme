import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Restaurant,
} from '@mui/icons-material';
import NutritionPlanForm from '../components/nutrition/NutritionPlanForm';
import { nutrition as nutritionApi } from '../services/api';

const Nutrition = () => {
  const [nutritionPlans, setNutritionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchNutritionPlans();
  }, []);

  const fetchNutritionPlans = async () => {
    try {
      const response = await nutritionApi.getAll();
      setNutritionPlans(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching nutrition plans:', error);
      setLoading(false);
    }
  };

  const handleCreatePlan = async (planData) => {
    try {
      await nutritionApi.create(planData);
      setOpenDialog(false);
      fetchNutritionPlans();
    } catch (error) {
      console.error('Error creating nutrition plan:', error);
    }
  };

  const handleUpdatePlan = async (planData) => {
    try {
      await nutritionApi.update(selectedPlan._id, planData);
      setOpenDialog(false);
      setSelectedPlan(null);
      fetchNutritionPlans();
    } catch (error) {
      console.error('Error updating nutrition plan:', error);
    }
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm('Are you sure you want to delete this nutrition plan?')) {
      try {
        await nutritionApi.delete(id);
        fetchNutritionPlans();
      } catch (error) {
        console.error('Error deleting nutrition plan:', error);
      }
    }
  };

  const calculateTotalCalories = (meals) => {
    return meals.reduce((total, meal) => {
      const mealCalories = meal.foods.reduce((sum, food) => sum + Number(food.calories || 0), 0);
      return total + mealCalories;
    }, 0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Nutrition Plans</Typography>
        {user.role === 'trainer' && (
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              setSelectedPlan(null);
              setOpenDialog(true);
            }}
          >
            Create Plan
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {nutritionPlans.map((plan) => (
          <Grid item xs={12} md={6} key={plan._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    {new Date(plan.startDate).toLocaleDateString()} -{' '}
                    {new Date(plan.endDate).toLocaleDateString()}
                  </Typography>
                  <Chip
                    label={plan.status}
                    color={plan.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>

                <Typography color="text.secondary" gutterBottom>
                  Daily Target: {plan.dailyCalorieTarget} calories
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Macro Targets:</Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant="body2">
                      Protein: {plan.macroTargets.protein}g
                    </Typography>
                    <Typography variant="body2">
                      Carbs: {plan.macroTargets.carbs}g
                    </Typography>
                    <Typography variant="body2">
                      Fats: {plan.macroTargets.fats}g
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Meals ({plan.meals.length}):
                </Typography>
                {plan.meals.map((meal, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      {meal.name} - {meal.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {calculateTotalCalories([meal])} calories
                    </Typography>
                  </Box>
                ))}

                {plan.restrictions && (
                  <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                    Restrictions: {plan.restrictions}
                  </Typography>
                )}
              </CardContent>
              {user.role === 'trainer' && (
                <CardActions>
                  <IconButton
                    onClick={() => {
                      setSelectedPlan(plan);
                      setOpenDialog(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePlan(plan._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedPlan(null);
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {selectedPlan ? 'Edit Nutrition Plan' : 'Create Nutrition Plan'}
        </DialogTitle>
        <DialogContent>
          <NutritionPlanForm
            initialData={selectedPlan}
            onSubmit={selectedPlan ? handleUpdatePlan : handleCreatePlan}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Nutrition; 