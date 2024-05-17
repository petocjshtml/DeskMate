function ShowAdminRegistrationRequests() {
   if (!checkAdminSession()) {
      return;
   }
   document.getElementById("render").innerHTML = `
   <div class="body-obsah">
   <nav class="navbar navbar-expand-lg" style="background: rgba(0, 0, 0, 0.5)">
      <a class="navbar-brand text-success" href="#" onclick="ShowAdminBuildings()">Administratorské rozhranie</a>
      <button
         class="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarNavAltMarkup"
         aria-controls="navbarNavAltMarkup"
         aria-expanded="false"
         aria-label="Toggle navigation"
         style="border-color: #28a745"
      >
         <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
         <div class="navbar-nav">
            <a class="nav-item nav-link text-white disabled" href="#" style="color: white"
               >Registračné žiadosti</a
            >
            <a class="nav-item nav-link text-success" href="#" onclick="ShowAdminProfile()" style="color: white"
               ><i class="fas fa-user-alt"></i> Profil</a
            >
            <a class="nav-item nav-link text-success" href="#" 
               onclick="deleteUserSession();ShowMainPageHTML();"  
               style="color: white"
               ><i class="fas fa-sign-out-alt"></i> Odhlásiť sa</a
            >
         </div>
      </div>
   </nav>
   <nav aria-label="breadcrumb">
      <ol class="breadcrumb mt-1" style="background: rgba(0, 0, 0, 0.5)">
         <li class="breadcrumb-item text-success">Root</li>
         <li class="breadcrumb-item">
            <a href="#" class="text-white">Registračné žiadosti</a>
         </li>
      </ol>
   </nav>

   <hr style="border: 2px solid #28a745" />
   <div class="container-fluid">
      <div class="row mt-1" id="parent">
         <!-- tu pridávať scriptom položky -->
      </div>
   </div>
    </div>
     `;
   LoadRegistrationRequestsFromDb();
}

function LoadRegistrationRequestsFromDb() {
   getData("/getAllAccountRequests")
      .then((data) => {
         showRegistrationRequestsFromDb(data);
      })
      .catch((error) => {
         console.error(error);
      });
}

function showRegistrationRequestsFromDb(registration_requests) {
   let parent_element = document.getElementById("parent");
   parent_element.innerHTML = "";
   registration_requests.forEach((registration_request) => {
      parent_element.innerHTML += `
       <div class="col-sm-12 col-md-6 mb-3">
          <div class="desk-mate-karta" mongo-id="${registration_request._id}">
             <span style="font-size: 1.25rem">${registration_request.name}</span>
             <hr style="border: 2px solid #28a745" />
             <ul>
                <li>Email: <span class="text-success">${registration_request.email}</span></li>
                <li>Tel. číslo: <span class="text-success">${registration_request.phoneNumber}</span></li>
             </ul>
             <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" onclick="approveAccountRequest(this)" class="btn btn-outline-success">Potvrdiť</button>
                <button type="button" onclick="rejectAccountRequest(this)" class="btn btn-outline-danger">Zamietnúť</button>
             </div>
          </div>
       </div>
       `;
   });
}

function approveAccountRequest(button) {
   const building_karta = button.closest(".desk-mate-karta");
   const id_to_approve = building_karta.getAttribute("mongo-id");
   const approve_info = {
      id: id_to_approve,
   };
   postData(approve_info, "/approveAccountRequestById")
      .then(() => {
         LoadRegistrationRequestsFromDb();
      })
      .catch(() => {
         alert("Chyba pri potvrdzovaní žiadosti");
      });
}

function rejectAccountRequest(button) {
   const building_karta = button.closest(".desk-mate-karta");
   const id_to_reject = building_karta.getAttribute("mongo-id");
   const reject_info = {
      id: id_to_reject,
   };
   postData(reject_info, "/rejectAccountRequestById")
      .then(() => {
         LoadRegistrationRequestsFromDb();
      })
      .catch(() => {
         alert("Chyba pri potvrdzovaní žiadosti");
      });
}
