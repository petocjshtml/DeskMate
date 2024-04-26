const User = require("../models/User");

class UserController {
   async addUser(userData) {
      try {
         const user = new User(userData);
         const savedUser = await user.save();
         return savedUser;
      } catch (error) {
         throw new Error(`Error adding user: ${error.message}`);
      }
   }

   async editUser(userId, updateData) {
      try {
         const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
               name: updateData.name,
               email: updateData.email,
               password: updateData.password,
               phoneNumber: updateData.phoneNumber,
            },
            { new: true }
         );
         if (!updatedUser) {
            throw new Error("User not found");
         }
         return updatedUser;
      } catch (error) {
         throw new Error(`Error updating user: ${error.message}`);
      }
   }

   async deleteUser(userId) {
      try {
         const deletedUser = await User.findByIdAndDelete(userId);
         if (!deletedUser) {
            throw new Error("User not found");
         }
         return deletedUser;
      } catch (error) {
         throw new Error(`Error deleting user: ${error.message}`);
      }
   }

   async selectUserByEmailAndPassword(email, password) {
      try {
         const user = await User.findOne({ email: email, password: password });
         if (!user) {
            return {};
         }
         return user;
      } catch (error) {
         throw new Error(`Error finding user: ${error.message}`);
      }
   }

   async selectUserByEmail(email) {
      try {
         const user = await User.findOne({ email: email });
         if (!user) {
            return {};
         }
         return user;
      } catch (error) {
         throw new Error(`Error finding user: ${error.message}`);
      }
   }

   async getAllUsers() {
      try {
         const allUsers = await User.find({});
         return allUsers;
      } catch (error) {
         throw new Error(`Error retrieving users: ${error.message}`);
      }
   }
}

module.exports = UserController;
