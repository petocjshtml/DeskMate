const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
   name: String,
   location: String,
});

const Building = mongoose.model("Building", buildingSchema);
module.exports = Building;
