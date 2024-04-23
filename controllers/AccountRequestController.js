const AccountRequest = require("../models/AccountRequest");

class AccountRequestController {
   // Vloženie novej žiadosti o účet
   async addAccountRequest(accountRequestData) {
      try {
         const accountRequest = new AccountRequest(accountRequestData);
         const savedAccountRequest = await accountRequest.save();
         return savedAccountRequest;
      } catch (error) {
         throw new Error(`Error creating account request: ${error.message}`);
      }
   }

   // Schválenie žiadosti adminom
   async approveAccountRequestById(requestId) {
      try {
         const updatedAccountRequest = await AccountRequest.findByIdAndUpdate(
            requestId,
            { isApprovedByAdmin: true },
            { new: true }
         );
         return updatedAccountRequest;
      } catch (error) {
         throw new Error(`Error approving account request: ${error.message}`);
      }
   }

   // Vymazanie žiadosti (alternatíva zamietnutia žiadosti adminom)
   async deleteAccountRequestById(requestId) {
      try {
         const deletedAccountRequest = await AccountRequest.findByIdAndDelete(requestId);
         return deletedAccountRequest;
      } catch (error) {
         throw new Error(`Error deleting account request: ${error.message}`);
      }
   }

   // Získanie všetkých registračných žiadostí
   async getAllAccountRequests() {
      try {
         const allAccountRequests = await AccountRequest.find({});
         return allAccountRequests;
      } catch (error) {
         throw new Error(`Error retrieving all account requests: ${error.message}`);
      }
   }

   // Overenie žiadosti používateľom
   async verifyAccountRequestByUser(requestId) {
      try {
         const updatedAccountRequest = await AccountRequest.findByIdAndUpdate(
            requestId,
            { isVerifiedByUser: true },
            { new: true }
         );
         return updatedAccountRequest;
      } catch (error) {
         throw new Error(`Error verifying account request by user: ${error.message}`);
      }
   }
}

module.exports = AccountRequestController;
