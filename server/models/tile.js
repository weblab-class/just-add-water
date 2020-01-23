const mongoose = require("mongoose");

const TileSchema = new mongoose.Schema({
    creator_id: String,
    xGrid: Number,
    zGrid: Number,
    flower: Object,
    growthState: Number,
});

module.exports = mongoose.model("Tile", TileSchema);
