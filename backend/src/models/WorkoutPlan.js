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
    default: 0
  },
  notes: String,
  restTime: {
    type: Number, // in seconds
    default: 60
  }
});

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema],
  notes: String,
  duration: {
    type: Number, // in minutes
    required: true
  }
});

const workoutPlanSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  schedule: [{
    dayOfWeek: {
      type: Number, // 0-6 (Sunday-Saturday)
      required: true
    },
    workout: workoutSchema
  }],
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  progress: [{
    date: {
      type: Date,
      default: Date.now
    },
    workoutCompleted: {
      type: Boolean,
      default: false
    },
    exercises: [{
      name: String,
      setsCompleted: Number,
      actualReps: [Number],
      actualWeight: [Number],
      notes: String
    }],
    feedback: String
  }]
}, {
  timestamps: true
});

// Add index for efficient querying
workoutPlanSchema.index({ client: 1, status: 1 });
workoutPlanSchema.index({ trainer: 1, status: 1 });

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
