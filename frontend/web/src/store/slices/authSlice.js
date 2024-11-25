import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Helper function to validate auth data
const isValidAuthData = (data) => {
  if (!data || typeof data !== 'object') return false;
  if (!data.token || typeof data.token !== 'string') return false;
  if (!data.user || typeof data.user !== 'object') return false;
  if (!data.user.id || !data.user.role) return false;
  return true;
};

// Helper function to persist auth state
const persistAuthState = (data) => {
  try {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return true;
  } catch (error) {
    console.error('Error persisting auth state:', error);
    return false;
  }
};

// Helper function to clear auth state
const clearAuthState = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (token && user) {
      return {
        token,
        user,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    }
  } catch (error) {
    console.error('Error loading initial state:', error);
    clearAuthState();
  }

  return {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      const data = response.data;

      if (!isValidAuthData(data)) {
        throw new Error('Invalid response format');
      }

      if (persistAuthState(data)) {
        return data;
      } else {
        throw new Error('Failed to persist auth state');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      const data = response.data;

      if (!isValidAuthData(data)) {
        throw new Error('Invalid response format');
      }

      if (persistAuthState(data)) {
        return data;
      } else {
        throw new Error('Failed to persist auth state');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      clearAuthState();
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Login failed';
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Registration failed';
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;