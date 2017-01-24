var mongoose = require("mongoose");

var catagorySchema = mongoose.Schema({
  dietId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  recipes: Array
})

var catagory = mongoose.model("catagory", catagorySchema);

module.exports = catagory;
