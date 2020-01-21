const mongoose = require("mongoose");

const TileSchema = new mongoose.Schema({
    creator_id: String,
    xGrid: Number,
    zGrid: Number,
    // if one exists
    flower: Object,
    growthState: Number,
    // may add dirt/color properties
});

module.exports = mongoose.model("Tile", TileSchema);
