const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   isAdmin: Boolean,
   name: String,
   email: String,
   password: String,
   phoneNumber: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
