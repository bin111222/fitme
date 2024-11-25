const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const { authenticateToken } = require('../middleware/auth');

// Get all workouts for a client
router.get('/client/:clientId', authenticateToken, async (req, res) => {
    try {
        const workouts = await Workout.find({
            clientId: req.params.clientId,
            trainerId: req.user.id
        }).sort({ date: -1 });
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ message: 'Failed to fetch workouts' });
    }
});

// Create a new workout
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { clientId, title, description, exercises } = req.body;
        
        const workout = new Workout({
            clientId,
            trainerId: req.user.id,
            title,
            description,
            exercises
        });

        const savedWorkout = await workout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ message: 'Failed to create workout' });
    }
});

// Update a workout
router.put('/:workoutId', authenticateToken, async (req, res) => {
    try {
        const workout = await Workout.findOneAndUpdate(
            { 
                _id: req.params.workoutId,
                trainerId: req.user.id
            },
            { $set: req.body },
            { new: true }
        );

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        res.json(workout);
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({ message: 'Failed to update workout' });
    }
});

// Delete a workout
router.delete('/:workoutId', authenticateToken, async (req, res) => {
    try {
        const workout = await Workout.findOneAndDelete({
            _id: req.params.workoutId,
            trainerId: req.user.id
        });

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        res.json({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ message: 'Failed to delete workout' });
    }
});

// Log workout progress
router.post('/:workoutId/progress', authenticateToken, async (req, res) => {
    try {
        const { exerciseProgress } = req.body;
        
        const workout = await Workout.findById(req.params.workoutId);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        // Update progress for each exercise
        workout.progress = new Map(Object.entries(exerciseProgress));
        workout.status = 'completed';
        
        await workout.save();
        
        res.json(workout);
    } catch (error) {
        console.error('Error logging workout progress:', error);
        res.status(500).json({ message: 'Failed to log workout progress' });
    }
});

// Get workout statistics
router.get('/stats/:clientId', authenticateToken, async (req, res) => {
    try {
        const workouts = await Workout.find({
            clientId: req.params.clientId,
            trainerId: req.user.id,
            status: 'completed'
        });

        const stats = {
            totalWorkouts: workouts.length,
            completedLastWeek: workouts.filter(w => {
                const workoutDate = new Date(w.date);
                const lastWeek = new Date();
                lastWeek.setDate(lastWeek.getDate() - 7);
                return workoutDate >= lastWeek;
            }).length,
            averageDuration: workouts.reduce((acc, curr) => acc + (curr.duration || 0), 0) / workouts.length || 0
        };

        res.json(stats);
    } catch (error) {
        console.error('Error fetching workout stats:', error);
        res.status(500).json({ message: 'Failed to fetch workout statistics' });
    }
});

module.exports = router;
