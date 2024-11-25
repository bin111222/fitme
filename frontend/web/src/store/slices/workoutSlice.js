import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchWorkouts = createAsyncThunk(
    'workout/fetchWorkouts',
    async ({ clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/workouts/client/${clientId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch workouts');
        }
    }
);

export const createWorkout = createAsyncThunk(
    'workout/createWorkout',
    async (workoutData, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/workouts', workoutData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create workout');
        }
    }
);

export const updateWorkout = createAsyncThunk(
    'workout/updateWorkout',
    async ({ workoutId, workoutData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/workouts/${workoutId}`, workoutData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update workout');
        }
    }
);

export const deleteWorkout = createAsyncThunk(
    'workout/deleteWorkout',
    async (workoutId, { rejectWithValue }) => {
        try {
            await api.delete(`/api/workouts/${workoutId}`);
            return workoutId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete workout');
        }
    }
);

export const logWorkoutProgress = createAsyncThunk(
    'workout/logProgress',
    async ({ workoutId, progressData }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/workouts/${workoutId}/progress`, progressData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to log workout progress');
        }
    }
);

export const fetchWorkoutStats = createAsyncThunk(
    'workout/fetchStats',
    async ({ clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/workouts/stats/${clientId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch workout statistics');
        }
    }
);

// Async thunks for workout plans
export const fetchWorkoutPlans = createAsyncThunk(
    'workout/fetchWorkoutPlans',
    async ({ clientId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/workout-plans/client/${clientId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch workout plans');
        }
    }
);

export const createWorkoutPlan = createAsyncThunk(
    'workout/createWorkoutPlan',
    async (planData, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/workout-plans', planData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create workout plan');
        }
    }
);

export const updateWorkoutPlan = createAsyncThunk(
    'workout/updateWorkoutPlan',
    async ({ planId, planData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/workout-plans/${planId}`, planData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update workout plan');
        }
    }
);

export const deleteWorkoutPlan = createAsyncThunk(
    'workout/deleteWorkoutPlan',
    async (planId, { rejectWithValue }) => {
        try {
            await api.delete(`/api/workout-plans/${planId}`);
            return planId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete workout plan');
        }
    }
);

const initialState = {
    workouts: [],
    workoutPlans: [],
    selectedWorkout: null,
    selectedWorkoutPlan: null,
    workoutStats: null,
    loading: false,
    error: null,
    statsLoading: false,
    statsError: null
};

const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        setSelectedWorkout: (state, action) => {
            state.selectedWorkout = action.payload;
        },
        setSelectedWorkoutPlan: (state, action) => {
            state.selectedWorkoutPlan = action.payload;
        },
        clearWorkoutError: (state) => {
            state.error = null;
            state.statsError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Workouts
            .addCase(fetchWorkouts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkouts.fulfilled, (state, action) => {
                state.loading = false;
                state.workouts = action.payload;
            })
            .addCase(fetchWorkouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Workout
            .addCase(createWorkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createWorkout.fulfilled, (state, action) => {
                state.loading = false;
                state.workouts.push(action.payload);
            })
            .addCase(createWorkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Workout
            .addCase(updateWorkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateWorkout.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.workouts.findIndex(w => w._id === action.payload._id);
                if (index !== -1) {
                    state.workouts[index] = action.payload;
                }
            })
            .addCase(updateWorkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Workout
            .addCase(deleteWorkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWorkout.fulfilled, (state, action) => {
                state.loading = false;
                state.workouts = state.workouts.filter(w => w._id !== action.payload);
            })
            .addCase(deleteWorkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Log Progress
            .addCase(logWorkoutProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logWorkoutProgress.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.workouts.findIndex(w => w._id === action.payload._id);
                if (index !== -1) {
                    state.workouts[index] = action.payload;
                }
            })
            .addCase(logWorkoutProgress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Stats
            .addCase(fetchWorkoutStats.pending, (state) => {
                state.statsLoading = true;
                state.statsError = null;
            })
            .addCase(fetchWorkoutStats.fulfilled, (state, action) => {
                state.statsLoading = false;
                state.workoutStats = action.payload;
            })
            .addCase(fetchWorkoutStats.rejected, (state, action) => {
                state.statsLoading = false;
                state.statsError = action.payload;
            })
            // Workout Plan reducers
            .addCase(fetchWorkoutPlans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkoutPlans.fulfilled, (state, action) => {
                state.loading = false;
                state.workoutPlans = action.payload;
            })
            .addCase(fetchWorkoutPlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createWorkoutPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createWorkoutPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.workoutPlans.push(action.payload);
            })
            .addCase(createWorkoutPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateWorkoutPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateWorkoutPlan.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.workoutPlans.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.workoutPlans[index] = action.payload;
                }
            })
            .addCase(updateWorkoutPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteWorkoutPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWorkoutPlan.fulfilled, (state, action) => {
                state.loading = false;
                state.workoutPlans = state.workoutPlans.filter(p => p._id !== action.payload);
            })
            .addCase(deleteWorkoutPlan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setSelectedWorkout, setSelectedWorkoutPlan, clearWorkoutError } = workoutSlice.actions;

export default workoutSlice.reducer;
