const Room = require("../models/Room");
const Building = require("../models/Building");

class RoomController {
   // Pridanie novej miestnosti, len ak existuje referenčná budova
   async addRoom(roomData) {
      try {
         // Skontrolovat existenciu budovy
         const buildingExists = await Building.findById(roomData.buildingId);
         if (!buildingExists) {
            throw new Error("Building with the given ID does not exist");
         }
         // Vytvorenie a ulozenie novej miestnosti
         const room = new Room(roomData);
         const savedRoom = await room.save();
         return savedRoom;
      } catch (error) {
         throw new Error(`Error adding room: ${error.message}`);
      }
   }

   // Úprava miestnosti podľa ID
   async editRoom(roomId, updateData) {
      try {
         const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            { roomName: updateData.roomName, roomLocation: updateData.roomLocation },
            { new: true, useFindAndModify: false }
         );
         if (!updatedRoom) {
            throw new Error("Room not found");
         }
         return updatedRoom;
      } catch (error) {
         throw new Error(`Error updating room: ${error.message}`);
      }
   }

   // Vymazanie miestnosti podľa ID
   async deleteRoom(roomId) {
      try {
         const deletedRoom = await Room.findByIdAndDelete(roomId);
         if (!deletedRoom) {
            throw new Error("Room not found");
         }
         return deletedRoom;
      } catch (error) {
         throw new Error(`Error deleting room: ${error.message}`);
      }
   }

   // Získanie všetkých miestností
   async getAllRooms() {
      try {
         const allRooms = await Room.find({});
         return allRooms;
      } catch (error) {
         throw new Error(`Error retrieving rooms: ${error.message}`);
      }
   }
}

module.exports = RoomController;
