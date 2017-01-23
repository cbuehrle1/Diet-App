var mongoose = require('mongoose');

var dietSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: String,
  calories: Number,
  fat: Number,
  carbohydrates: Number,
  protein: Number
})

var diet = mongoose.model("diet", dietSchema);

module.exports = diet;
