import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchNutritionPlans = createAsyncThunk(
  'nutrition/fetchNutritionPlans',
  async ({ clientId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/trainers/clients/${clientId}/nutrition-plans`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch nutrition plans');
    }
  }
);

export const createNutritionPlan = createAsyncThunk(
  'nutrition/createNutritionPlan',
  async ({ clientId, planData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/trainers/clients/${clientId}/nutrition-plans`, planData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create nutrition plan');
    }
  }
);

export const updateNutritionPlan = createAsyncThunk(
  'nutrition/updateNutritionPlan',
  async ({ clientId, planId, planData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/trainers/clients/${clientId}/nutrition-plans/${planId}`, planData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update nutrition plan');
    }
  }
);

export const deleteNutritionPlan = createAsyncThunk(
  'nutrition/deleteNutritionPlan',
  async ({ clientId, planId }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/trainers/clients/${clientId}/nutrition-plans/${planId}`);
      return planId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete nutrition plan');
    }
  }
);

export const logNutritionProgress = createAsyncThunk(
  'nutrition/logNutritionProgress',
  async ({ clientId, planId, progressData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/trainers/clients/${clientId}/nutrition-plans/${planId}/progress`,
        progressData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to log nutrition progress');
    }
  }
);

const initialState = {
  nutritionPlans: [],
  selectedPlan: null,
  loading: false,
  error: null,
  progressLoading: false,
  progressError: null,
};

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.progressError = null;
    },
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Nutrition Plans
      .addCase(fetchNutritionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNutritionPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.nutritionPlans = action.payload;
      })
      .addCase(fetchNutritionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Nutrition Plan
      .addCase(createNutritionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNutritionPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.nutritionPlans.push(action.payload);
      })
      .addCase(createNutritionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Nutrition Plan
      .addCase(updateNutritionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNutritionPlan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.nutritionPlans.findIndex(plan => plan._id === action.payload._id);
        if (index !== -1) {
          state.nutritionPlans[index] = action.payload;
        }
        if (state.selectedPlan?._id === action.payload._id) {
          state.selectedPlan = action.payload;
        }
      })
      .addCase(updateNutritionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Nutrition Plan
      .addCase(deleteNutritionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNutritionPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.nutritionPlans = state.nutritionPlans.filter(plan => plan._id !== action.payload);
        if (state.selectedPlan?._id === action.payload) {
          state.selectedPlan = null;
        }
      })
      .addCase(deleteNutritionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Log Nutrition Progress
      .addCase(logNutritionProgress.pending, (state) => {
        state.progressLoading = true;
        state.progressError = null;
      })
      .addCase(logNutritionProgress.fulfilled, (state, action) => {
        state.progressLoading = false;
        const index = state.nutritionPlans.findIndex(plan => plan._id === action.payload._id);
        if (index !== -1) {
          state.nutritionPlans[index] = action.payload;
        }
        if (state.selectedPlan?._id === action.payload._id) {
          state.selectedPlan = action.payload;
        }
      })
      .addCase(logNutritionProgress.rejected, (state, action) => {
        state.progressLoading = false;
        state.progressError = action.payload;
      });
  },
});

export const { clearError, setSelectedPlan } = nutritionSlice.actions;

export default nutritionSlice.reducer;
