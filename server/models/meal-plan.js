var mongoose = require('mongoose');

var mealPlanSchema = mongoose.Schema({
  dietId: { type: mongoose.Schema.Types.ObjectId, required: true },
  active: { type: Boolean, default: false },
  plan: Array
});

var mealPlan = mongoose.model('mealPlan', mealPlanSchema);

module.exports = mealPlan;
