const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');
const auth = require('../middleware/auth');
const { isTrainer } = require('../middleware/roleCheck');

// Create nutrition plan (trainers only)
router.post('/', auth, isTrainer, nutritionController.createNutritionPlan);

// Get nutrition plans (filtered by user role)
router.get('/', auth, nutritionController.getNutritionPlans);

// Update nutrition plan (trainers only)
router.put('/:id', auth, isTrainer, nutritionController.updateNutritionPlan);

// Delete nutrition plan (trainers only)
router.delete('/:id', auth, isTrainer, nutritionController.deleteNutritionPlan);

module.exports = router; 