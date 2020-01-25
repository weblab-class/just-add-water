const mongoose = require("mongoose");

const waterInfoSchema = new mongoose.Schema({
  googleid: String,
  waterPerDay: Number,
  cupSize: Number,
  waterConsumedToday: Number
});

// compile model from schema
module.exports = mongoose.model("waterInfo", waterInfoSchema);