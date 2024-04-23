function ShowAccountRequestHTML() {
   document.getElementById("render").innerHTML = `
   <div class="welcome-section">
   <div class="container">
      <div class="row">
         <div class="col-md-8 offset-md-2">
            <div class="form-container">
               <h2 class="text-success">Request an Account</h2>
               <form>
                  <div class="form-group">
                     <label for="email">Email Address</label>
                     <input
                        type="email"
                        class="form-control"
                        id="reg_request_email"
                        placeholder="Enter your email here."
                        required
                     />
                  </div>
                  <div class="form-group">
                     <label for="firstName">Full Name</label>
                     <input
                        type="text"
                        class="form-control"
                        id="reg_request_full_name"
                        placeholder="Enter your full name here."
                        required
                     />
                  </div>
                  <div class="form-group">
                     <label for="phone">Phone Number</label>
                     <input
                        type="tel"
                        class="form-control"
                        id="reg_request_phone_number"
                        placeholder="Enter your phone number here."
                        required
                     />
                  </div>

                  <button type="submit" class="btn btn-success" onclick="event.preventDefault(); sendRegistrationRequest();">Submit Request</button>
                  <a style="text-decoration: none; cursor: pointer" 
                  href="index.html"
                  onclick="event.preventDefault(); ShowMainPageHTML();"
                     ><h1>←</h1></a
                  >
               </form>
            </div>
         </div>
      </div>
   </div>
   </div>
    `;
}

function sendRegistrationRequest() {
   const email = document.getElementById("reg_request_email").value;
   const name = document.getElementById("reg_request_full_name").value;
   const phoneNumber = document.getElementById("reg_request_phone_number").value;
   const registrationRequest = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      isApprovedByAdmin: false,
      isVerifiedByUser: false,
   };
   postData(registrationRequest, "/addAccountRequest")
      .then((data) => {
         alert(
            "Tvoja žiadosť bola poslana adminovi na schválenie. Ak bude schválená, príde ti email s prihlasovacími údajmi"
         );
         ShowMainPageHTML();
      })
      .catch((error) => {
         console.error(error);
      });
}
