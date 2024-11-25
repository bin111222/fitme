const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    notes: String,
    restTime: Number // in seconds
});

const workoutSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    exercises: [exerciseSchema],
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: Number, // in minutes
    notes: String,
    progress: {
        type: Map,
        of: {
            completed: Boolean,
            actualSets: Number,
            actualReps: Number,
            actualWeight: Number,
            notes: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
workoutSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
