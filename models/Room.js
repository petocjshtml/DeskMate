const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
   buildingId: { type: mongoose.Schema.Types.ObjectId, ref: "Building" },
   roomName: String,
   roomLocation: String,
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
