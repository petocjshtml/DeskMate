const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
   deskId: { type: mongoose.Schema.Types.ObjectId, ref: "Desk" },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   // 1800 sekúnd = 30 minút
   // (každá rezervácia trvá pol hodinu)
   dateTime: { type: Date, expires: 1800 }, //automatické mazanie rezervácie v mongoDb po jej uplynutí
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
