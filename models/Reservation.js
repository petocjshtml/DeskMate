const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
   deskId: { type: mongoose.Schema.Types.ObjectId, ref: "Desk" },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   startDateTime: Date,
   endDateTime: Date,
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
