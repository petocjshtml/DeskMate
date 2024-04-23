async function postData(jsonData, endpoint_url) {
   const endpointUrl = `${window.location.origin}${endpoint_url}`;
   try {
      const response = await fetch(endpointUrl, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
   } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
   }
}

/* 
// volanie funkcie - príklad
const userData = {
   name: "Peter",
   age: 30,
   occupation: "developer",
};

postData(userData, "/")
   .then((data) => {
      console.log(data);
   })
   .catch((error) => {
      console.error(error);
   }); 
*/
