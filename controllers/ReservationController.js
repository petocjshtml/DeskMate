const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Desk = require("../models/Desk");

class ReservationController {
   async addReservation(reservationData) {
      try {
         const { deskId, timeFrom, timeTo } = reservationData;
         const existingReservations = await Reservation.find({
            deskId: deskId,
            $or: [{ timeFrom: { $lt: timeTo }, timeTo: { $gt: timeFrom } }],
         });

         if (existingReservations.length > 0) {
            throw new Error("There is already a reservation for the selected time interval.");
         }
         const reservation = new Reservation(reservationData);
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
            throw new Error(`Reservation with ID ${reservationId} not found`);
         }
         return deletedReservation;
      } catch (error) {
         throw new Error(`Error deleting reservation: ${error.message}`);
      }
   }

   async getReservationsByUserId(userId) {
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

   async getReservationsByDeskId(deskId) {
      try {
         const deskExists = await Desk.findById(deskId);
         if (!deskExists) {
            throw new Error("Desk does not exist");
         }
         const reservations = await Reservation.find({ deskId: deskId })
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
         throw new Error(`Error finding reservations by desk ID: ${error.message}`);
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
