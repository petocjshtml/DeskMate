const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
   deskId: { type: mongoose.Schema.Types.ObjectId, ref: "Desk" },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   timeFrom: Date,
   timeTo: { type: Date, index: { expires: "0s" } },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
