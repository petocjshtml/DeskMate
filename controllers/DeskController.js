const Desk = require("../models/Desk");
const Room = require("../models/Room");
const Equipment = require("../models/Equipment");
const EquipmentController = require("./EquipmentController");
const ReservationController = require("./ReservationController");

class DeskController {
   // Pridanie stola
   async addDesk(deskData) {
      try {
         // Overiť, či existuje miestnosť
         const roomExists = await Room.findById(deskData.roomId);
         if (!roomExists) {
            throw new Error("Room with the given ID does not exist");
         }

         const desk = new Desk(deskData);
         const savedDesk = await desk.save();
         return savedDesk;
      } catch (error) {
         throw new Error(`Error adding desk: ${error.message}`);
      }
   }

   // Úprava stola
   async editDesk(deskId, updateData) {
      try {
         const updatedDesk = await Desk.findByIdAndUpdate(
            deskId,
            { deskName: updateData.deskName, peopleNumber: updateData.peopleNumber },
            { new: true }
         );
         return updatedDesk;
      } catch (error) {
         throw new Error(`Error updating desk: ${error.message}`);
      }
   }

   // Pridanie vybavenia k stolu
   async addEquipment(deskId, equipmentId) {
      try {
         // Overiť, či existuje vybavenie
         const equipmentExists = await Equipment.findById(equipmentId);
         if (!equipmentExists) {
            throw new Error("Equipment with the given ID does not exist");
         }

         const updatedDesk = await Desk.findByIdAndUpdate(
            deskId,
            { $addToSet: { equipmentIds: equipmentId } }, // Použiť $addToSet na zabránenie duplikátov
            { new: true }
         );
         return updatedDesk;
      } catch (error) {
         throw new Error(`Error adding equipment to desk: ${error.message}`);
      }
   }

   // Vymazanie vybavenia zo stola
   async deleteEquipment(deskId, equipmentId) {
      try {
         const updatedDesk = await Desk.findByIdAndUpdate(
            deskId,
            { $pull: { equipmentIds: equipmentId } }, // Odstrániť vybavenie z pola
            { new: true }
         );
         return updatedDesk;
      } catch (error) {
         throw new Error(`Error removing equipment from desk: ${error.message}`);
      }
   }

   static async deleteAllDesksByRoomId(roomId) {
      try {
         const desks = await Desk.find({ roomId: roomId });
         for (const desk of desks) {
            await EquipmentController.deleteAllEquipmentByDeskId(desk._id);
            await ReservationController.deleteAllReservationsByDeskId(desk._id);
         }
         await Desk.deleteMany({ roomId: roomId });
      } catch (error) {
         throw new Error(`Error deleting desks: ${error.message}`);
      }
   }

   // Vymazanie stola
   async deleteDesk(deskId) {
      try {
         const deletedDesk = await Desk.findByIdAndDelete(deskId);
         return deletedDesk;
      } catch (error) {
         throw new Error(`Error deleting desk: ${error.message}`);
      }
   }

   // Získanie všetkých stolov
   async getAllDesks() {
      try {
         const allDesks = await Desk.find({});
         return allDesks;
      } catch (error) {
         throw new Error(`Error retrieving desks: ${error.message}`);
      }
   }
}

module.exports = DeskController;
