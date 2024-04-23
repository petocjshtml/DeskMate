const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
   name: String,
});

const Equipment = mongoose.model("Equipment", equipmentSchema, "equipments");
module.exports = Equipment;
