const NutritionPlan = require('../models/Nutrition');

exports.createNutritionPlan = async (req, res) => {
  try {
    const nutritionPlan = new NutritionPlan({
      ...req.body,
      trainer: req.user._id
    });
    
    await nutritionPlan.save();
    res.status(201).json(nutritionPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating nutrition plan', error: error.message });
  }
};

exports.getNutritionPlans = async (req, res) => {
  try {
    const filters = {};
    
    if (req.user.role === 'trainer') {
      filters.trainer = req.user._id;
    } else {
      filters.client = req.user._id;
      filters.status = 'active'; // Clients only see active plans
    }

    const nutritionPlans = await NutritionPlan.find(filters)
      .populate('client', 'profile.firstName profile.lastName')
      .populate('trainer', 'profile.firstName profile.lastName')
      .sort({ startDate: -1 });

    res.json(nutritionPlans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nutrition plans', error: error.message });
  }
};

exports.updateNutritionPlan = async (req, res) => {
  try {
    const nutritionPlan = await NutritionPlan.findOneAndUpdate(
      {
        _id: req.params.id,
        trainer: req.user._id
      },
      req.body,
      { new: true }
    );

    if (!nutritionPlan) {
      return res.status(404).json({ message: 'Nutrition plan not found' });
    }

    res.json(nutritionPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating nutrition plan', error: error.message });
  }
};

exports.deleteNutritionPlan = async (req, res) => {
  try {
    const nutritionPlan = await NutritionPlan.findOneAndDelete({
      _id: req.params.id,
      trainer: req.user._id
    });

    if (!nutritionPlan) {
      return res.status(404).json({ message: 'Nutrition plan not found' });
    }

    res.json({ message: 'Nutrition plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting nutrition plan', error: error.message });
  }
}; 