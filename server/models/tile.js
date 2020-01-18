const mongoose = require("mongoose");

const TileSchema = new mongoose.Schema({
    creator_id: String,
    x_coord: Number,
    z_coord: Number,
    // if one exists
    flower: Object,
    growth_state: Number,
    // may add dirt/color properties
});

module.exports = mongoose.model("Tile", TileSchema);
