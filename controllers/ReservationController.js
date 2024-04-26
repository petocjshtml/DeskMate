const Reservation = require("../models/Reservation");
const Desk = require("../models/Desk");
const User = require("../models/User");

class ReservationController {
   async addReservation(reservationData) {
      try {
         const { deskId, userId, dateTime } = reservationData;
         const deskExists = await Desk.findById(deskId);
         const userExists = await User.findById(userId);
         if (!deskExists || !userExists) {
            throw new Error("Desk or User does not exist");
         }
         const requestTime = new Date(dateTime);
         const startTime = new Date(requestTime.getTime() - 30 * 55000);
         const endTime = new Date(requestTime.getTime() + 30 * 55000);
         const overlappingReservation = await Reservation.findOne({
            deskId: deskId,
            dateTime: {
               $gte: startTime,
               $lt: endTime,
            },
         });
         if (overlappingReservation) {
            throw new Error(
               "A reservation already exists within 30 minutes of the requested time slot."
            );
         }
         const reservation = new Reservation({
            deskId,
            userId,
            dateTime: requestTime,
         });
         const savedReservation = await reservation.save();
         return savedReservation;
      } catch (error) {
         throw new Error(`Error adding reservation: ${error.message}`);
      }
   }

   async deleteReservation(reservationId) {
      try {
         const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
         if (!deletedReservation) {
            throw new Error("Reservation not found");
         }
         return deletedReservation;
      } catch (error) {
         throw new Error(`Error deleting reservation: ${error.message}`);
      }
   }

   async getAllReservationsByUserId(userId) {
      try {
         const userExists = await User.findById(userId);
         if (!userExists) {
            throw new Error("User does not exist");
         }

         const reservations = await Reservation.find({ userId: userId })
            .populate({
               path: "deskId",
               populate: {
                  path: "roomId",
                  model: "Room",
                  populate: {
                     path: "buildingId",
                     model: "Building",
                  },
               },
            })
            .populate({
               path: "deskId",
               populate: {
                  path: "equipmentIds",
                  model: "Equipment",
               },
            })
            .populate("userId");

         return reservations;
      } catch (error) {
         throw new Error(`Error retrieving reservations by user ID: ${error.message}`);
      }
   }

   async getAllReservationsOfDeskArray(deskIds) {
      try {
         const reservations = await Reservation.find({
            deskId: { $in: deskIds },
         })
            .populate("deskId")
            .populate("userId");
         return reservations;
      } catch (error) {
         throw new Error(`Error retrieving reservations for the desk array: ${error.message}`);
      }
   }
}

module.exports = ReservationController;
