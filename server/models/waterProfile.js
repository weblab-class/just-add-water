const mongoose = require("mongoose");

const waterProfileSchema = new mongoose.Schema({
  userId: String,
  weight:Number,
  waterPerDay: Number,
  cupSize: Number,
  waterConsumedToday: Number,
  weight: Number,
  age: Number,
  activity: Number, 
}, {timestamps:true});

// compile model from schema
module.exports = mongoose.model("waterProfile", waterProfileSchema);
