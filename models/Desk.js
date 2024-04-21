const mongoose = require("mongoose");

const deskSchema = new mongoose.Schema({
   roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
   deskName: String,
   peopleNumber: Number,
   equipmentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
});

const Desk = mongoose.model("Desk", deskSchema);
module.exports = Desk;
