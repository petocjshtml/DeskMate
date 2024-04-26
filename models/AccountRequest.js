const mongoose = require("mongoose");

const accountRequestSchema = new mongoose.Schema({
   name: String,
   email: String,
   phoneNumber: String,
});

const AccountRequest = mongoose.model("AccountRequest", accountRequestSchema, "account_requests");
module.exports = AccountRequest;
