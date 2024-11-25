import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Add as AddIcon } from '@mui/icons-material';
import NutritionPlanForm from '../../components/nutrition/NutritionPlanForm';

const NutritionPlans = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const dispatch = useDispatch();
  const { nutritionPlans, loading } = useSelector((state) => state.nutrition);

  useEffect(() => {
    // Fetch nutrition plans when component mounts
    // dispatch(fetchNutritionPlans());
  }, [dispatch]);

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setOpenForm(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setOpenForm(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Nutrition Plans
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreatePlan}
        >
          Create New Plan
        </Button>
      </Box>

      <Grid container spacing={3}>
        {nutritionPlans?.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {plan.clientName}
                </Typography>
                <Typography variant="body2" paragraph>
                  {plan.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Daily Calories: {plan.dailyCalories}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Macros: {plan.macros}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditPlan(plan)}
                  >
                    Edit Plan
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => {/* Handle view details */}}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <NutritionPlanForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        plan={selectedPlan}
      />
    </Container>
  );
};

export default NutritionPlans;
