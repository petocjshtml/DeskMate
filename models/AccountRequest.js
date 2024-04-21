const mongoose = require("mongoose");

const accountRequestSchema = new mongoose.Schema({
   name: String, // Meno a priezvisko
   email: String, // Email
   phoneNumber: String, // Telefónne číslo
   isApprovedByAdmin: { type: Boolean, default: false }, // Je schválená adminom
   isVerifiedByUser: { type: Boolean, default: false }, // Je overená používateľom
});

//zmena názvu kolekcie z accountrequests na account_requests, nech je to prehľadné...
const AccountRequest = mongoose.model("AccountRequest", accountRequestSchema, "account_requests");
module.exports = AccountRequest;
