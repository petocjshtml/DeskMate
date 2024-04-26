const Building = require("../models/Building");
const RoomController = require("./RoomController");
const DeskController = require("./DeskController");
const roomController = new RoomController();
const deskController = new DeskController();

class BuildingController {
   async addBuilding(buildingData) {
      try {
         const building = new Building(buildingData);
         const savedBuilding = await building.save();
         return savedBuilding;
      } catch (error) {
         throw new Error(`Error adding building: ${error.message}`);
      }
   }

   async updateBuilding(buildingId, updateData) {
      try {
         const updatedBuilding = await Building.findByIdAndUpdate(buildingId, updateData, {
            new: true,
            useFindAndModify: false,
         });
         return updatedBuilding;
      } catch (error) {
         throw new Error(`Error updating building: ${error.message}`);
      }
   }

   async deleteBuilding(buildingId) {
      try {
         const deletedBuilding = await Building.findByIdAndDelete(buildingId);
         if (!deletedBuilding) {
            return null;
         }
         return deletedBuilding;
      } catch (error) {
         throw new Error(`Error deleting building: ${error.message}`);
      }
   }

   async getAllBuildings() {
      try {
         const allBuildings = await Building.find({});
         return allBuildings;
      } catch (error) {
         throw new Error(`Error retrieving all buildings: ${error.message}`);
      }
   }

   async getBuildingWithAllNestedObjects(buildingId) {
      try {
         const building = await Building.findById(buildingId);
         if (!building) {
            throw new Error("Building not found");
         }
         const rooms = await roomController.getAllRoomsByBuildingId(buildingId);
         const roomsWithDesks = await Promise.all(
            rooms.map(async (room) => {
               const desks = await deskController.getAllDesksByRoomId(room._id);
               return { ...room.toObject(), desks };
            })
         );
         return { ...building.toObject(), rooms: roomsWithDesks };
      } catch (error) {
         throw new Error(`Error getting building with nested objects: ${error.message}`);
      }
   }
}

module.exports = BuildingController;
