const Reservation = require("../models/Reservation");
const Desk = require("../models/Desk");
const User = require("../models/User");

class ReservationController {
   // Pridanie rezervácie
   async addReservation(reservationData) {
      try {
         const { deskId, userId, startDateTime, endDateTime } = reservationData;

         // Kontrola existencie stola a používateľa
         const deskExists = await Desk.findById(deskId);
         const userExists = await User.findById(userId);
         if (!deskExists || !userExists) {
            throw new Error("Desk or User does not exist");
         }

         // Kontrola, či sa rezervácia prekrýva s existujúcou rezerváciou
         const overlappingReservation = await Reservation.findOne({
            deskId,
            endDateTime: { $gt: startDateTime },
            startDateTime: { $lt: endDateTime },
         });

         if (overlappingReservation) {
            throw new Error("There is already a reservation for the specified time range");
         }

         // Vytvorenie rezervácie
         const reservation = new Reservation(reservationData);
         const savedReservation = await reservation.save();
         return savedReservation;
      } catch (error) {
         throw new Error(`Error adding reservation: ${error.message}`);
      }
   }

   // Vymazanie rezervácie
   async deleteReservation(reservationId) {
      try {
         const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
         return deletedReservation;
      } catch (error) {
         throw new Error(`Error deleting reservation: ${error.message}`);
      }
   }

   // Získanie všetkých rezervácií
   async getAllReservations() {
      try {
         const allReservations = await Reservation.find({});
         return allReservations;
      } catch (error) {
         throw new Error(`Error retrieving all reservations: ${error.message}`);
      }
   }

   // Získanie všetkých rezervácií pre špecifického používateľa
   async getUserReservations(userId) {
      try {
         const userReservations = await Reservation.find({ userId });
         return userReservations;
      } catch (error) {
         throw new Error(`Error retrieving user's reservations: ${error.message}`);
      }
   }

   // Získanie všetkých rezervácií pre špecifický stôl
   async getDeskReservations(deskId) {
      try {
         const deskReservations = await Reservation.find({ deskId });
         return deskReservations;
      } catch (error) {
         throw new Error(`Error retrieving desk's reservations: ${error.message}`);
      }
   }
}

module.exports = ReservationController;
