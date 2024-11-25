import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  BarChart as ProgressIcon,
} from '@mui/icons-material';
import {
  fetchWorkoutPlans,
  deleteWorkoutPlan,
  setSelectedPlan,
} from '../../store/slices/workoutSlice';
import WorkoutPlanForm from './WorkoutPlanForm';

const WorkoutPlanList = ({ clientId }) => {
  const dispatch = useDispatch();
  const { workoutPlans, loading, error } = useSelector((state) => state.workouts);
  const [openForm, setOpenForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchWorkoutPlans({ clientId }));
    }
  }, [dispatch, clientId]);

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setOpenForm(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setOpenForm(true);
  };

  const handleDeleteClick = (plan) => {
    setPlanToDelete(plan);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (planToDelete) {
      await dispatch(deleteWorkoutPlan({ clientId, planId: planToDelete._id }));
      setOpenDeleteDialog(false);
      setPlanToDelete(null);
    }
  };

  const handleViewProgress = (plan) => {
    dispatch(setSelectedPlan(plan));
    // Navigation to progress view will be handled by parent component
  };

  if (loading && !workoutPlans?.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">Workout Plans</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreatePlan}
        >
          Create Plan
        </Button>
      </Box>

      <Grid container spacing={3}>
        {workoutPlans?.map((plan) => (
          <Grid item xs={12} md={6} lg={4} key={plan._id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" gutterBottom>
                    {plan.title}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleViewProgress(plan)}
                      title="View Progress"
                    >
                      <ProgressIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEditPlan(plan)}
                      title="Edit Plan"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(plan)}
                      title="Delete Plan"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography color="textSecondary" gutterBottom>
                  {plan.description}
                </Typography>

                <Box mt={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Schedule:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {plan.schedule?.map((item, index) => (
                      <Chip
                        key={index}
                        label={`${item.dayOfWeek}: ${item.workout.name}`}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>

                <Box mt={2}>
                  <Typography variant="caption" display="block">
                    Start Date: {new Date(plan.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" display="block">
                    End Date: {new Date(plan.endDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Form Dialog */}
      <WorkoutPlanForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        clientId={clientId}
        initialData={selectedPlan}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Workout Plan</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the workout plan "{planToDelete?.title}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkoutPlanList;
