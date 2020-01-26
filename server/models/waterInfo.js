const mongoose = require("mongoose");

const waterInfoSchema = new mongoose.Schema({
  userId: String,
  weight:Number,
  waterPerDay: Number,
  cupSize: Number,
  waterConsumedToday: Number,
  weight: Number,
  age: Number,
  activity: Number
});

// compile model from schema
module.exports = mongoose.model("waterInfo", waterInfoSchema);
