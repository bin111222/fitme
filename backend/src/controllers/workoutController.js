const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  try {
    const workout = new Workout({
      ...req.body,
      trainer: req.user._id // From auth middleware
    });
    
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout', error: error.message });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const filters = {};
    
    // If user is a trainer, get their client's workouts
    if (req.user.role === 'trainer') {
      filters.trainer = req.user._id;
    } else {
      // If user is a client, get their workouts
      filters.client = req.user._id;
    }

    const workouts = await Workout.find(filters)
      .populate('client', 'profile.firstName profile.lastName')
      .populate('trainer', 'profile.firstName profile.lastName')
      .sort({ date: -1 });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error: error.message });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { 
        _id: req.params.id,
        trainer: req.user._id // Ensure trainer owns the workout
      },
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout', error: error.message });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      trainer: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout', error: error.message });
  }
}; 