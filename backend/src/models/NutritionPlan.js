const mongoose = require('mongoose');

const mealItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  portion: {
    amount: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  calories: {
    type: Number,
    required: true
  },
  macros: {
    protein: Number,
    carbs: Number,
    fats: Number
  },
  notes: String
});

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  timeOfDay: {
    type: String,
    required: true
  },
  items: [mealItemSchema],
  totalCalories: Number,
  notes: String
});

const nutritionPlanSchema = new mongoose.Schema({
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
  dailyCalorieTarget: {
    type: Number,
    required: true
  },
  macroTargets: {
    protein: Number,
    carbs: Number,
    fats: Number
  },
  schedule: [{
    dayOfWeek: {
      type: Number, // 0-6 (Sunday-Saturday)
      required: true
    },
    meals: [mealSchema]
  }],
  restrictions: [{
    type: String
  }],
  supplements: [{
    name: String,
    dosage: String,
    timing: String,
    notes: String
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
    mealsLogged: [{
      name: String,
      timeOfDay: String,
      items: [{
        name: String,
        portion: {
          amount: Number,
          unit: String
        },
        calories: Number,
        macros: {
          protein: Number,
          carbs: Number,
          fats: Number
        }
      }],
      notes: String
    }],
    totalCalories: Number,
    actualMacros: {
      protein: Number,
      carbs: Number,
      fats: Number
    },
    waterIntake: Number,
    mood: String,
    notes: String,
    adherence: {
      type: Number,
      min: 0,
      max: 100
    }
  }]
}, {
  timestamps: true
});

// Add index for efficient querying
nutritionPlanSchema.index({ client: 1, status: 1 });
nutritionPlanSchema.index({ trainer: 1, status: 1 });

// Calculate total calories for a meal before saving
mealSchema.pre('save', function(next) {
  this.totalCalories = this.items.reduce((total, item) => total + item.calories, 0);
  next();
});

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema);
