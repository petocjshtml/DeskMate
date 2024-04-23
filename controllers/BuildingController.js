const Building = require("../models/Building");
// Tu sa predpokladá, že model Building má polia `name` a `location`.

class BuildingController {
   // Pridanie novej budovy
   async addBuilding(buildingData) {
      try {
         const building = new Building(buildingData);
         const savedBuilding = await building.save();
         return savedBuilding;
      } catch (error) {
         throw new Error(`Error adding building: ${error.message}`);
      }
   }

   // Úprava budovy podľa ID
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

   // Vymazanie budovy podľa ID
   async deleteBuilding(buildingId) {
      try {
         const deletedBuilding = await Building.findByIdAndDelete(buildingId);
         return deletedBuilding;
      } catch (error) {
         throw new Error(`Error deleting building: ${error.message}`);
      }
   }

   // Získanie všetkých budov
   async getAllBuildings() {
      try {
         const allBuildings = await Building.find({});
         return allBuildings;
      } catch (error) {
         throw new Error(`Error retrieving all buildings: ${error.message}`);
      }
   }
}

module.exports = BuildingController;
