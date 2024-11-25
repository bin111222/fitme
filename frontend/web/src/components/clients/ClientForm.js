import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';
import { addClient, updateClient } from '../../store/slices/trainerSlice';

const ClientForm = ({ open, onClose, initialData = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    initialData || {
      email: '',
      password: '',
      profile: {
        firstName: '',
        lastName: '',
        phone: '',
        goals: []
      }
    }
  );
  const [newGoal, setNewGoal] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!initialData && !formData.password) newErrors.password = 'Password is required';
    if (!formData.profile.firstName) newErrors.firstName = 'First name is required';
    if (!formData.profile.lastName) newErrors.lastName = 'Last name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (initialData) {
        await dispatch(updateClient({
          clientId: initialData._id,
          clientData: formData
        })).unwrap();
      } else {
        await dispatch(addClient(formData)).unwrap();
      }
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setFormData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          goals: [...prev.profile.goals, newGoal.trim()]
        }
      }));
      setNewGoal('');
    }
  };

  const handleDeleteGoal = (goalToDelete) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        goals: prev.profile.goals.filter(goal => goal !== goalToDelete)
      }
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {initialData ? 'Edit Client' : 'Add New Client'}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={!!initialData}
              />
            </Grid>
            {!initialData && (
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                name="profile.firstName"
                label="First Name"
                fullWidth
                value={formData.profile.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="profile.lastName"
                label="Last Name"
                fullWidth
                value={formData.profile.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="profile.phone"
                label="Phone"
                fullWidth
                value={formData.profile.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <TextField
                  label="Add Goal"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGoal())}
                  fullWidth
                />
                <IconButton onClick={handleAddGoal} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {formData.profile.goals.map((goal, index) => (
                  <Chip
                    key={index}
                    label={goal}
                    onDelete={() => handleDeleteGoal(goal)}
                  />
                ))}
              </Box>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <Box color="error.main">{errors.submit}</Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Update' : 'Add'} Client
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClientForm;
