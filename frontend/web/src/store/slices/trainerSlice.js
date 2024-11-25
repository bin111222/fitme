import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchClients = createAsyncThunk(
  'trainer/fetchClients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/trainers/clients');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch clients');
    }
  }
);

export const addClient = createAsyncThunk(
  'trainer/addClient',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/trainers/clients', clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add client');
    }
  }
);

export const updateClient = createAsyncThunk(
  'trainer/updateClient',
  async ({ clientId, clientData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/trainers/clients/${clientId}`, clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update client');
    }
  }
);

export const deleteClient = createAsyncThunk(
  'trainer/deleteClient',
  async (clientId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/trainers/clients/${clientId}`);
      return clientId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete client');
    }
  }
);

export const assignWorkoutPlan = createAsyncThunk(
  'trainer/assignWorkoutPlan',
  async ({ clientId, planData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/trainers/clients/${clientId}/workout-plan`, planData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to assign workout plan');
    }
  }
);

export const assignNutritionPlan = createAsyncThunk(
  'trainer/assignNutritionPlan',
  async ({ clientId, planData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/trainers/clients/${clientId}/nutrition-plan`, planData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to assign nutrition plan');
    }
  }
);

const initialState = {
  clients: [],
  loading: false,
  error: null,
  selectedClient: null,
  workoutPlans: [],
  nutritionPlans: [],
};

const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Clients
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Client
      .addCase(addClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Client
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clients.findIndex(client => client._id === action.payload._id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Client
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.filter(client => client._id !== action.payload);
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Assign Workout Plan
      .addCase(assignWorkoutPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignWorkoutPlan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clients.findIndex(client => client._id === action.payload.clientId);
        if (index !== -1) {
          state.clients[index].workoutPlan = action.payload.plan;
        }
      })
      .addCase(assignWorkoutPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Assign Nutrition Plan
      .addCase(assignNutritionPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignNutritionPlan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clients.findIndex(client => client._id === action.payload.clientId);
        if (index !== -1) {
          state.clients[index].nutritionPlan = action.payload.plan;
        }
      })
      .addCase(assignNutritionPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setSelectedClient } = trainerSlice.actions;

export default trainerSlice.reducer;
