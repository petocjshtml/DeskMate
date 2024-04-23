const AccountRequest = require("../models/AccountRequest");

class AccountRequestController {
   async addAccountRequest(accountRequestData) {
      try {
         const accountRequest = new AccountRequest(accountRequestData);
         const savedAccountRequest = await accountRequest.save();
         return savedAccountRequest;
      } catch (error) {
         throw new Error(`Error creating account request: ${error.message}`);
      }
   }

   async deleteAccountRequestById(requestId) {
      try {
         const deletedAccountRequest = await AccountRequest.findByIdAndDelete(requestId);
         return deletedAccountRequest;
      } catch (error) {
         throw new Error(`Error deleting account request: ${error.message}`);
      }
   }

   async getAccountRequestById(requestId) {
      try {
         const accountRequest = await AccountRequest.findById(requestId);
         if (!accountRequest) {
            throw new Error("No account request found with that ID");
         }
         return accountRequest;
      } catch (error) {
         throw new Error(`Error retrieving account request: ${error.message}`);
      }
   }

   async getAllAccountRequests() {
      try {
         const allAccountRequests = await AccountRequest.find({});
         return allAccountRequests;
      } catch (error) {
         throw new Error(`Error retrieving all account requests: ${error.message}`);
      }
   }
}

module.exports = AccountRequestController;
