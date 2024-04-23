const AccountRequestController = require("./controllers/AccountRequestController");
const BuildingController = require("./controllers/BuildingController");
const DeskController = require("./controllers/DeskController");
const EquipmentController = require("./controllers/EquipmentController");
const ReservationController = require("./controllers/ReservationController");
const RoomController = require("./controllers/RoomController");
const UserController = require("./controllers/UserController");

const accountRequestController = new AccountRequestController();
const buildingController = new BuildingController();
const deskController = new DeskController();
const equipmentController = new EquipmentController();
const reservationController = new ReservationController();
const roomController = new RoomController();
const userController = new UserController();

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());

mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB Connected"))
   .catch((err) => console.error("MongoDB Connection Error:", err));

const port = process.env.PORT || 3000;

//endpointy
//########################################## ACCOUNT REQUESTS ################################
/* 
//Pridanie žiadosti účtu do databázy
req.body = {
   name: "Alojz Srnka",
   email: "alojzsrnka@gmail.com",
   phoneNumber: "0911 153 826", 
   isApprovedByAdmin: false,
   isVerifiedByUser: false,
};
*/
app.post("/addAccountRequest", async (req, res) => {
   try {
      const newAccountRequest = await accountRequestController.addAccountRequest(req.body);
      res.status(201).send(newAccountRequest);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
//Schválenie žiadosti účtu adminom
req.body = {
   id: "platne_mongo_id_z_kolekcie_account_requests",
};
*/
app.post("/approveAccountRequestById", async (req, res) => {
   try {
      const updatedRequest = await accountRequestController.approveAccountRequestById(req.body.id);
      res.status(200).send(updatedRequest);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Vymazanie žiadosti (alternatíva zamietnutia žiadosti adminom)
req.body = {
   id: "platne_mongo_id_z_kolekcie_account_requests",
}; 
*/
app.post("/deleteAccountRequestById", async (req, res) => {
   try {
      const deletedRequest = await accountRequestController.deleteAccountRequestById(req.body.id);
      res.status(204).send(deletedRequest);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Overenie žiadosti používateľom
req.body = {
   id: "platne_mongo_id_z_kolekcie_account_requests",
}; 
*/
app.post("/verifyAccountRequestByUser", async (req, res) => {
   try {
      const verifiedRequest = await accountRequestController.verifyAccountRequestByUser(
         req.body.id
      );
      res.status(200).send(verifiedRequest);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

// Získanie všetkých žiadostí o účet
app.get("/getAllAccountRequests", async (req, res) => {
   try {
      const allRequests = await accountRequestController.getAllAccountRequests();
      res.status(200).send(allRequests);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

//########################################## BUILDINGS ################################

/* 
// Pridanie novej budovy
req.body = {
   name: "Názov budovy",
   location: "Lokalita budovy"
}; 
*/
app.post("/addBuilding", async (req, res) => {
   try {
      const newBuilding = await buildingController.addBuilding(req.body);
      res.status(201).send(newBuilding);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Úprava budovy podľa ID
req.body = {
   id: "platne_mongo_id_z_kolekcie_building",
   updateData: {
      name: "Nový názov budovy",
      location: "Nová lokalita"
   }
}; 
*/
app.post("/updateBuilding", async (req, res) => {
   try {
      const updatedBuilding = await buildingController.updateBuilding(
         req.body.id,
         req.body.updateData
      ); // updateBuilding
      res.status(200).send(updatedBuilding);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Vymazanie budovy podľa ID
req.body = {
   id: "platne_mongo_id_z_kolekcie_building"
}; 
*/
app.post("/deleteBuilding", async (req, res) => {
   try {
      const deletedBuilding = await buildingController.deleteBuilding(req.body.id);
      res.status(200).send(deletedBuilding);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

// Získanie všetkých budov
app.get("/getAllBuildings", async (req, res) => {
   try {
      const allBuildings = await buildingController.getAllBuildings();
      res.status(200).send(allBuildings);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

//########################################## ROOMS ################################

/* 
// Pridanie novej miestnosti
req.body = {
   buildingId: "platne_mongo_id_z_kolekcie_building",
   roomName: "Názov miestnosti",
   roomLocation: "Poloha miestnosti"
}; 
*/
app.post("/addRoom", async (req, res) => {
   try {
      const newRoom = await roomController.addRoom(req.body);
      res.status(201).send(newRoom);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Úprava miestnosti podľa ID
req.body = {
   id: "platne_mongo_id_z_kolekcie_room",
   updateData: {
      roomName: "Nový názov miestnosti",
      roomLocation: "Nová poloha miestnosti"
   }
}; 
*/
app.post("/editRoom", async (req, res) => {
   try {
      const updatedRoom = await roomController.editRoom(req.body.id, req.body.updateData);
      res.status(200).send(updatedRoom);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Vymazanie miestnosti podľa ID
req.body = {
   id: "platne_mongo_id_z_kolekcie_room"
}; 
*/
app.post("/deleteRoom", async (req, res) => {
   try {
      const deletedRoom = await roomController.deleteRoom(req.body.id);
      res.status(200).send(deletedRoom);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

// Získanie všetkých miestností
app.get("/getAllRooms", async (req, res) => {
   try {
      const allRooms = await roomController.getAllRooms();
      res.status(200).send(allRooms);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

//########################################## DESKS ################################

/* 
// Pridanie stola
req.body = {
   roomId: "platne_mongo_id_z_kolekcie_room",
   deskName: "Názov stola",
   peopleNumber: 4,
   equipmentIds: ["platne_mongo_id_z_kolekcie_equipment1", "platne_mongo_id_z_kolekcie_equipment2"]
}; 
*/
app.post("/addDesk", async (req, res) => {
   try {
      const newDesk = await deskController.addDesk(req.body);
      res.status(201).send(newDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Úprava stola
req.body = {
   id: "platne_mongo_id_z_kolekcie_desk",
   updateData: {
      deskName: "Nový názov stola",
      peopleNumber: 6
   }
}; 
*/
app.post("/editDesk", async (req, res) => {
   try {
      const updatedDesk = await deskController.editDesk(req.body.id, req.body.updateData);
      res.status(200).send(updatedDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Pridanie vybavenia k stolu
req.body = {
   deskId: "platne_mongo_id_z_kolekcie_desk",
   equipmentId: "platne_mongo_id_z_kolekcie_equipment"
}; 
*/
app.post("/addEquipmentToDesk", async (req, res) => {
   try {
      const updatedDesk = await deskController.addEquipment(req.body.deskId, req.body.equipmentId);
      res.status(200).send(updatedDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Vymazanie vybavenia zo stola
req.body = {
   deskId: "platne_mongo_id_z_kolekcie_desk",
   equipmentId: "platne_mongo_id_z_kolekcie_equipment"
}; 
*/
app.post("/removeEquipmentFromDesk", async (req, res) => {
   try {
      const updatedDesk = await deskController.deleteEquipment(
         req.body.deskId,
         req.body.equipmentId
      );
      res.status(200).send(updatedDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Vymazanie stola
req.body = {
   id: "platne_mongo_id_z_kolekcie_desk"
}; 
*/
app.post("/deleteDesk", async (req, res) => {
   try {
      const deletedDesk = await deskController.deleteDesk(req.body.id);
      res.status(200).send(deletedDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

// Získanie všetkých stolov
app.get("/getAllDesks", async (req, res) => {
   try {
      const allDesks = await deskController.getAllDesks();
      res.status(200).send(allDesks);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

//########################################## EQUIPMENTS ################################

/* 
// Pridanie nového vybavenia
req.body = {
   name: "Názov vybavenia"
}; 
*/
app.post("/addEquipment", async (req, res) => {
   try {
      const newEquipment = await equipmentController.addEquipment(req.body);
      res.status(201).send(newEquipment);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Vymazanie vybavenia podľa ID
req.body = {
   id: "platne_mongo_id_z_kolekcie_equipment"
}; 
*/
app.post("/deleteEquipment", async (req, res) => {
   try {
      const deletedEquipment = await equipmentController.deleteEquipment(req.body.id);
      res.status(200).send(deletedEquipment);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

// Získanie všetkého vybavenia
app.get("/getAllEquipments", async (req, res) => {
   try {
      const allEquipment = await equipmentController.getAllEquipments();
      res.status(200).send(allEquipment);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

//########################################## RESERVATIONS ################################

/* 
// Pridanie rezervácie
req.body = {
   deskId: "platne_mongo_id_z_kolekcie_desk",
   userId: "platne_mongo_id_z_kolekcie_user",
   startDateTime: "2024-04-30T09:00:00Z",
   endDateTime: "2024-04-30T17:00:00Z",
}; 
*/
app.post("/addReservation", async (req, res) => {
   try {
      const newReservation = await reservationController.addReservation(req.body);
      res.status(201).send(newReservation);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Vymazanie rezervácie
req.body = {
   id: "platne_mongo_id_z_kolekcie_reservation",
}; 
*/
app.post("/deleteReservation", async (req, res) => {
   try {
      const deletedReservation = await reservationController.deleteReservation(req.body.id);
      res.status(200).send(deletedReservation);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

// Získanie všetkých rezervácií
app.get("/getAllReservations", async (req, res) => {
   try {
      const allReservations = await reservationController.getAllReservations();
      res.status(200).send(allReservations);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

/* 
// Získanie všetkých rezervácií pre špecifického používateľa
req.body = {
   userId: "platne_mongo_id_z_kolekcie_user",
}; 
*/
app.post("/getUserReservations", async (req, res) => {
   try {
      const userReservations = await reservationController.getUserReservations(req.body.userId);
      res.status(200).send(userReservations);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Získanie všetkých rezervácií pre špecifický stôl
req.body = {
   deskId: "platne_mongo_id_z_kolekcie_desk",
}; 
*/
app.post("/getDeskReservations", async (req, res) => {
   try {
      const deskReservations = await reservationController.getDeskReservations(req.body.deskId);
      res.status(200).send(deskReservations);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

//########################################## USERS ################################

/* 
// Pridanie nového používateľa
req.body = {
   isAdmin: false,
   name: "Meno Používateľa",
   email: "email@domena.com",
   password: "heslo123",
   phoneNumber: "0900123456"
}; 
*/
app.post("/addUser", async (req, res) => {
   try {
      const newUser = await userController.addUser(req.body);
      res.status(201).send(newUser);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Úprava existujúceho používateľa
req.body = {
   id: "platne_mongo_id_z_kolekcie_user",
   updateData: {
      name: "Nové Meno",
      password: "noveHeslo",
      phoneNumber: "0911234567"
   }
}; 
*/
app.post("/editUser", async (req, res) => {
   try {
      const updatedUser = await userController.editUser(req.body.id, req.body.updateData);
      res.status(200).send(updatedUser);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

/* 
// Vymazanie používateľa podľa ID
req.body = {
   id: "platne_mongo_id_z_kolekcie_user"
}; 
*/
app.post("/getAllUsers", async (req, res) => {
   try {
      const deletedUser = await userController.deleteUser(req.body.id);
      res.status(200).send(deletedUser);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

// Získanie všetkých používateľov
app.get("/getAllUsers", async (req, res) => {
   try {
      const allUsers = await userController.getAllUsers();
      res.status(200).send(allUsers);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

//########################################## Kombinované endpointy ################################

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
