const mongoose = require("mongoose");
const Room = require("./Room");

const buildingSchema = new mongoose.Schema({
   name: String,
   location: String,
});

//middleware pre automatické zmazanie všetkých poddobjektov rooms
buildingSchema.pre("findOneAndDelete", async function () {
   console.log("This happened");
});

const Building = mongoose.model("Building", buildingSchema);
module.exports = Building;
