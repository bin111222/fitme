const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const auth = require('../middleware/auth');
const { isTrainer } = require('../middleware/roleCheck');

// Create workout (trainers only)
router.post('/', auth, isTrainer, workoutController.createWorkout);

// Get workouts (filtered by user role)
router.get('/', auth, workoutController.getWorkouts);

// Update workout (trainers only)
router.put('/:id', auth, isTrainer, workoutController.updateWorkout);

// Delete workout (trainers only)
router.delete('/:id', auth, isTrainer, workoutController.deleteWorkout);

module.exports = router; 