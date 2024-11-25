import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Link,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #f7f7f7 0%, #e5e5e5 100%)',
  padding: theme.spacing(3),
}));

const GlassCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await dispatch(login(formData)).unwrap();
      // Redirect will be handled by the auth slice
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <GradientBox>
      <Container maxWidth="sm">
        <GlassCard>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                  Welcome Back
                </Typography>
                
                <Typography variant="body1" color="text.secondary" align="center">
                  Sign in to continue to FitMe
                </Typography>

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {error && (
                  <Typography color="error" variant="body2" align="center">
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Sign In
                </Button>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Link href="/signup" underline="hover">
                    Don't have an account? Sign Up
                  </Link>
                  <Link href="/forgot-password" underline="hover">
                    Forgot Password?
                  </Link>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </GlassCard>
      </Container>
    </GradientBox>
  );
};

export default Login;
