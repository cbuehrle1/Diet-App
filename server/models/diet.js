var mongoose = require('mongoose');

var dietSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, required: true }
  calories: Number,
  fat: Number,
  saturatedFat: Number,
  carbohydrates: Number,
  protein: Number
})

var diet = mongoose.model("diet", dietSchema);

module.exports = diet;
