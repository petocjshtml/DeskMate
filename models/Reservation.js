const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
   deskId: { type: mongoose.Schema.Types.ObjectId, ref: "Desk" },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   timeFrom: Date,
   timeTo: Date,
   expiresAt: { type: Date, index: { expires: 0 } },
});

reservationSchema.pre("save", function (next) {
   //- 2 hodiny - mongo systém číta časy dve hodiny dozadu
   this.expiresAt = new Date(this.timeTo.getTime() - 7200000);
   next();
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
