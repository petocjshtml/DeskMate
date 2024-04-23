const axios = require("axios");
const baseUrl = "http://localhost:3000";

async function testEndpoints() {
   try {
      // Test Add Account Request
      let response = await axios.post(`${baseUrl}/addAccountRequest`, {
         name: "Alojz Srnka",
         email: "alojzsrnka@gmail.com",
         phoneNumber: "0911 153 826",
         isApprovedByAdmin: false,
         isVerifiedByUser: false,
      });
      console.log("Add Account Request:", response.data);

      const accountRequestId = response.data._id; // Uložíme ID pre ďalšie použitie

      // Test Approve Account Request by Admin
      response = await axios.post(`${baseUrl}/approveAccountRequestById`, {
         id: accountRequestId,
      });
      console.log("Approve Account Request:", response.data);

      // Test Verify Account Request by User
      response = await axios.post(`${baseUrl}/verifyAccountRequestByUser`, {
         id: accountRequestId,
      });
      console.log("Verify Account Request:", response.data);
      /* 
      // Test Get All Account Requests
      response = await axios.get(`${baseUrl}/getAllAccountRequests`);
      console.log("All Account Requests:", response.data);

      // Test Add Building
      response = await axios.post(`${baseUrl}/addBuilding`, {
         name: "Názov budovy",
         location: "Lokalita budovy",
      });
      console.log("Add Building:", response.data);

      const buildingId = response.data._id; // Uložíme ID pre ďalšie použitie

      // Test Update Building
      response = await axios.post(`${baseUrl}/updateBuilding`, {
         id: buildingId,
         updateData: {
            name: "Nový názov budovy",
            location: "Nová lokalita",
         },
      });
      console.log("Update Building:", response.data);

      // Test Delete Building
      response = await axios.post(`${baseUrl}/deleteBuilding`, {
         id: buildingId,
      });
      console.log("Delete Building:", response.status); 
      */

      // Pokračujte s testovaním ďalších endpointov podľa potreby...
   } catch (error) {
      console.error("Error during API call:", error.response.data);
   }
}

testEndpoints();

//atď napísať si pre hociktorý endpoint, ktorý je potrebné testovať
