const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
   name: String,
   location: String,
});

buildingSchema.pre("findOneAndDelete", async function () {
   //ak bude v budúcnosti potrebné implementovať logiku skupinového vymazávania objektov (cascade delete)
});

const Building = mongoose.model("Building", buildingSchema);
module.exports = Building;
