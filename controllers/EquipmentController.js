const Equipment = require("../models/Equipment");

class EquipmentController {
   async addEquipment(equipmentData) {
      try {
         const existingEquipment = await Equipment.findOne({ name: equipmentData.name });
         if (existingEquipment) {
            console.log(`Equipment with name ${equipmentData.name} already exists`);
            return {}; // Return null or the existing equipment if you want to use it after calling this function
         }
         const equipment = new Equipment(equipmentData);
         const savedEquipment = await equipment.save();
         return savedEquipment;
      } catch (error) {
         throw new Error(`Error adding equipment: ${error.message}`);
      }
   }

   async addEquipments(equipments_arr) {
      try {
         const addedEquipments = [];
         for (const equipmentName of equipments_arr) {
            // Corrected iteration over array
            const existingEquipment = await Equipment.findOne({ name: equipmentName });
            if (!existingEquipment) {
               const equipment = new Equipment({ name: equipmentName });
               const savedEquipment = await equipment.save();
               addedEquipments.push(savedEquipment);
            } else {
               console.log(`Equipment with name ${equipmentName} already exists`);
            }
         }
         return addedEquipments;
      } catch (error) {
         throw new Error(`Error adding multiple equipments: ${error.message}`);
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

   async findEquipmentsByNames(equipments_arr) {
      const names = equipments_arr.equipments;
      if (names.length !== 0) {
         try {
            const equipments = await Equipment.find({
               name: { $in: names },
            }).select("_id name");

            if (equipments.length === 0) {
               throw new Error(`No equipment found for the provided names`);
            }

            return equipments.map((eq) => ({ id: eq._id, name: eq.name })); // Vráti pole objektov s ID a názvom
         } catch (error) {
            throw new Error(`Error finding equipments by names: ${error.message}`);
         }
      } else {
         return [];
      }
   }

   // Vyhľadávanie vybavenia podľa názvu
   async findEquipmentByName(name) {
      try {
         const equipment = await Equipment.findOne({ name });
         if (!equipment) {
            throw new Error(`No equipment found with the name ${name}`);
         }
         return equipment;
      } catch (error) {
         throw new Error(`Error finding equipment by name: ${error.message}`);
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
