import api from './api';

const workoutService = {
    // Fetch all workouts for a client
    fetchWorkouts: async (clientId) => {
        const response = await api.get(`/api/workouts/client/${clientId}`);
        return response.data;
    },

    // Create a new workout
    createWorkout: async (workoutData) => {
        const response = await api.post('/api/workouts', workoutData);
        return response.data;
    },

    // Update an existing workout
    updateWorkout: async (workoutId, workoutData) => {
        const response = await api.put(`/api/workouts/${workoutId}`, workoutData);
        return response.data;
    },

    // Delete a workout
    deleteWorkout: async (workoutId) => {
        await api.delete(`/api/workouts/${workoutId}`);
    },

    // Log workout progress
    logProgress: async (workoutId, progressData) => {
        const response = await api.post(`/api/workouts/${workoutId}/progress`, progressData);
        return response.data;
    },

    // Fetch workout statistics
    fetchWorkoutStats: async (clientId) => {
        const response = await api.get(`/api/workouts/stats/${clientId}`);
        return response.data;
    }
};

export default workoutService;
