const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  foods: [{
    name: String,
    portion: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number
  }],
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
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  meals: [mealSchema],
  dailyCalorieTarget: Number,
  macroTargets: {
    protein: Number,
    carbs: Number,
    fats: Number
  },
  restrictions: [String],
  notes: String,
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema); 