const Equipment = require("../models/Equipment");

class EquipmentController {
   // Pridanie nového vybavenia
   async addEquipment(equipmentData) {
      try {
         const equipment = new Equipment(equipmentData);
         const savedEquipment = await equipment.save();
         return savedEquipment;
      } catch (error) {
         throw new Error(`Error adding equipment: ${error.message}`);
      }
   }

   // Vymazanie vybavenia podľa ID
   async deleteEquipment(equipmentId) {
      try {
         const deletedEquipment = await Equipment.findByIdAndDelete(equipmentId);
         if (!deletedEquipment) {
            throw new Error(`Equipment with ID ${equipmentId} not found`);
         }
         return deletedEquipment;
      } catch (error) {
         throw new Error(`Error deleting equipment: ${error.message}`);
      }
   }

   // Získanie všetkého vybavenia
   async getAllEquipments() {
      try {
         const allEquipment = await Equipment.find({});
         return allEquipment;
      } catch (error) {
         throw new Error(`Error retrieving all equipment: ${error.message}`);
      }
   }
}

module.exports = EquipmentController;
