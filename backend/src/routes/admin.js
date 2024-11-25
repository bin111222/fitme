const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');
const User = require('../models/User');
const Workout = require('../models/Workout');

// Create initial admin account
router.post('/setup', async (req, res) => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin account already exists' });
        }

        const { email, password, firstName, lastName } = req.body;
        console.log('Creating admin with:', { email, firstName, lastName });

        // Create admin user
        const admin = new User({
            email,
            password, // Password will be hashed by the pre-save hook
            role: 'admin',
            profile: {
                firstName,
                lastName
            }
        });

        await admin.save();
        console.log('Admin created successfully with hashed password');
        res.status(201).json({ message: 'Admin account created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Error creating admin account' });
    }
});

// Get dashboard overview
router.get('/dashboard', auth, isAdmin, async (req, res) => {
    try {
        const stats = {
            users: {
                total: await User.countDocuments(),
                trainers: await User.countDocuments({ role: 'trainer' }),
                clients: await User.countDocuments({ role: 'client' }),
                admins: await User.countDocuments({ role: 'admin' })
            },
            workouts: await Workout.countDocuments(),
            recentUsers: await User.find()
                .select('-password')
                .sort({ createdAt: -1 })
                .limit(5),
            recentWorkouts: await Workout.find()
                .populate('client', 'email profile.firstName profile.lastName')
                .sort({ createdAt: -1 })
                .limit(5)
        };
        
        res.json(stats);
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

// Get all users
router.get('/users', auth, isAdmin, async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Get all workouts
router.get('/workouts', auth, isAdmin, async (req, res) => {
    try {
        const workouts = await Workout.find()
            .populate('client', 'email profile.firstName profile.lastName')
            .sort({ createdAt: -1 });
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ message: 'Error fetching workouts' });
    }
});

module.exports = router;
