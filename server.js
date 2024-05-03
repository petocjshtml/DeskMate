const AccountRequestController = require("./controllers/AccountRequestController");
const BuildingController = require("./controllers/BuildingController");
const DeskController = require("./controllers/DeskController");
const EquipmentController = require("./controllers/EquipmentController");
const ReservationController = require("./controllers/ReservationController");
const RoomController = require("./controllers/RoomController");
const UserController = require("./controllers/UserController");
const EmailSender = require("./controllers/EmailSender");

const accountRequestController = new AccountRequestController();
const buildingController = new BuildingController();
const deskController = new DeskController();
const equipmentController = new EquipmentController();
const reservationController = new ReservationController();
const roomController = new RoomController();
const userController = new UserController();
const emailSender = new EmailSender();

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.static("public"));
const generatePassword = require("./my_modules/generatePassword");

mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB Connected"))
   .catch((err) => console.error("MongoDB Connection Error:", err));

const port = process.env.PORT || 3000;

//########################################## ENDPOINTY ################################

//frontend stránka
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/login", async (req, res) => {
   try {
      const auth = await userController.selectUserByEmailAndPassword(
         req.body.email,
         req.body.password
      );
      res.status(201).send(auth);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/checkIfUserExists", async (req, res) => {
   try {
      const is_user_exists = await userController.selectUserByEmail(req.body.email);
      res.status(201).send(is_user_exists);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/addAccountRequest", async (req, res) => {
   try {
      const newAccountRequest = await accountRequestController.addAccountRequest(req.body);
      res.status(201).send(newAccountRequest);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/approveAccountRequestById", async (req, res) => {
   try {
      const account_request = await accountRequestController.getAccountRequestById(req.body.id);
      await accountRequestController.deleteAccountRequestById(account_request);
      const user_password = generatePassword();
      const user = {
         isAdmin: false,
         name: account_request.name,
         email: account_request.email,
         password: user_password,
         phoneNumber: account_request.phoneNumber,
      };
      await userController.addUser(user);
      await emailSender.potvrdUcet(account_request.email, user_password);
      res.status(200).send({ message: "Registračná žiadosť schválená" });
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/rejectAccountRequestById", async (req, res) => {
   try {
      const account_request = await accountRequestController.getAccountRequestById(req.body.id);
      const deletedRequest = await accountRequestController.deleteAccountRequestById(req.body.id);
      await emailSender.zamietniUcet(account_request.email);
      res.status(204).send(deletedRequest);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.get("/getAllAccountRequests", async (req, res) => {
   try {
      const allRequests = await accountRequestController.getAllAccountRequests();
      res.status(200).send(allRequests);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

app.post("/addBuilding", async (req, res) => {
   try {
      const newBuilding = await buildingController.addBuilding(req.body);
      res.status(201).send(newBuilding);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/updateBuilding", async (req, res) => {
   try {
      const updatedBuilding = await buildingController.updateBuilding(
         req.body.id,
         req.body.updateData
      );
      res.status(200).send(updatedBuilding);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/deleteBuilding", async (req, res) => {
   try {
      const deletedBuilding = await buildingController.deleteBuilding(req.body.id);
      res.status(200).send(deletedBuilding);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/getBuildingWithAllNestedObjects", async (req, res) => {
   try {
      const buildingWithNestedObjects = await buildingController.getBuildingWithAllNestedObjects(
         req.body.id
      );
      res.status(200).send(buildingWithNestedObjects);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.get("/getAllBuildings", async (req, res) => {
   try {
      const allBuildings = await buildingController.getAllBuildings();
      res.status(200).send(allBuildings);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

app.post("/addRoom", async (req, res) => {
   try {
      const newRoom = await roomController.addRoom(req.body);
      res.status(201).send(newRoom);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/editRoom", async (req, res) => {
   try {
      const updatedRoom = await roomController.editRoom(req.body.id, req.body.updateData);
      res.status(200).send(updatedRoom);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/deleteRoom", async (req, res) => {
   try {
      const deletedRoom = await roomController.deleteRoom(req.body.id);
      res.status(200).send(deletedRoom);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.get("/getAllRooms", async (req, res) => {
   try {
      const allRooms = await roomController.getAllRooms();
      res.status(200).send(allRooms);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

app.post("/getAllRoomsByBuildingId", async (req, res) => {
   try {
      const allRooms = await roomController.getAllRoomsByBuildingId(req.body.id);
      res.status(200).send(allRooms);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

app.post("/addDesk", async (req, res) => {
   try {
      const newDesk = await deskController.addDesk(req.body);
      res.status(201).send(newDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/editDesk", async (req, res) => {
   try {
      const updatedDesk = await deskController.editDesk(req.body.id, req.body.updateData);
      res.status(200).send(updatedDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/addEquipmentToDesk", async (req, res) => {
   try {
      const updatedDesk = await deskController.addEquipment(req.body.deskId, req.body.equipmentId);
      res.status(200).send(updatedDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

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

app.post("/deleteDesk", async (req, res) => {
   try {
      const deletedDesk = await deskController.deleteDesk(req.body.id);
      res.status(200).send(deletedDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/selectDeskById", async (req, res) => {
   try {
      const selectedDesk = await deskController.selectDeskById(req.body.id);
      res.status(200).send(selectedDesk);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/getAllDesksByRoomId", async (req, res) => {
   try {
      const desksByRoomId = await deskController.getAllDesksByRoomId(req.body.id);
      res.status(200).send(desksByRoomId);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/addEquipment", async (req, res) => {
   try {
      const newEquipment = await equipmentController.addEquipment(req.body);
      res.status(201).send(newEquipment);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/addEquipments", async (req, res) => {
   try {
      const newEquipments = await equipmentController.addEquipments(req.body.equipments);
      res.status(201).send(newEquipments);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/findEquipmentByName", async (req, res) => {
   try {
      const EquipmentIds = await equipmentController.findEquipmentByName(req.body.name);
      res.status(201).send(EquipmentIds);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/findEquipmentsByNames", async (req, res) => {
   try {
      const EquipmentIds = await equipmentController.findEquipmentsByNames(req.body);
      res.status(201).send(EquipmentIds);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/deleteEquipment", async (req, res) => {
   try {
      const deletedEquipment = await equipmentController.deleteEquipment(req.body.id);
      res.status(200).send(deletedEquipment);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.get("/getAllEquipments", async (req, res) => {
   try {
      const allEquipment = await equipmentController.getAllEquipments();
      res.status(200).send(allEquipment);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

app.post("/addReservation", async (req, res) => {
   try {
      const newReservation = await reservationController.addReservation(req.body);
      res.status(201).send(newReservation);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/deleteReservation", async (req, res) => {
   try {
      const deletedReservation = await reservationController.deleteReservation(req.body.id);
      res.status(201).send(deletedReservation);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/getAllReservationsOfDeskArray", async (req, res) => {
   try {
      const foundReservations = await reservationController.getAllReservationsOfDeskArray(
         req.body.deskArray
      );
      res.status(201).send(foundReservations);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/getAllReservationsByUserId", async (req, res) => {
   try {
      const foundReservations = await reservationController.getAllReservationsByUserId(req.body.id);
      res.status(201).send(foundReservations);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/addUser", async (req, res) => {
   try {
      const newUser = await userController.addUser(req.body);
      res.status(201).send(newUser);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/editUser", async (req, res) => {
   try {
      const updatedUser = await userController.editUser(req.body.id, req.body.updateData);
      res.status(200).send(updatedUser);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.post("/getAllUsers", async (req, res) => {
   try {
      const deletedUser = await userController.deleteUser(req.body.id);
      res.status(200).send(deletedUser);
   } catch (error) {
      res.status(400).send({ error: error.message });
   }
});

app.get("/getAllUsers", async (req, res) => {
   try {
      const allUsers = await userController.getAllUsers();
      res.status(200).send(allUsers);
   } catch (error) {
      res.status(500).send({ error: error.message });
   }
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
