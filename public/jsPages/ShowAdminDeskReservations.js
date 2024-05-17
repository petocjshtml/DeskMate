function ShowAdminDeskReservations(desk_link) {
   if (!checkAdminSession()) {
      return;
   }
   const roomId = desk_link.getAttribute("room-id");
   const roomName = desk_link.getAttribute("room-name");
   const buildingName = desk_link.getAttribute("building-name");
   const buildingId = desk_link.getAttribute("building-id");
   const deskId = desk_link.getAttribute("desk-id");
   const deskName = desk_link.getAttribute("desk-name");
   document.getElementById("render").innerHTML = `
      <div class="body-obsah">
      <nav class="navbar navbar-expand-lg" style="background: rgba(0, 0, 0, 0.5)">
      <a class="navbar-brand text-white" href="#">Administratorské rozhranie</a>
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
          <a class="nav-item nav-link text-success" href="#" onclick="ShowAdminRegistrationRequests()" style="color: white"
              >Registračné žiadosti</a
          >
          <a class="nav-item nav-link text-success" href="#" onclick="ShowAdminProfile()" style="color: white"
              ><i class="fas fa-user-alt"></i> Profil</a
          >
          <a class="nav-item nav-link text-success" href="#" onclick="deleteUserSession();ShowMainPageHTML();" style="color: white"
              ><i class="fas fa-sign-out-alt"></i> Odhlásiť sa</a
          >
          </div>
      </div>
      </nav>
  
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb mt-1" style="background: rgba(0, 0, 0, 0.5)">
          <li class="breadcrumb-item text-success">Root</li>
          <li class="breadcrumb-item" >
          <a href="#" onclick="ShowAdminBuildings()" class="text-success">Budovy</a>
          </li>
          <li class="breadcrumb-item" >
          <a href="#" 
          onclick="event.preventDefault(); ShowAdminBuildingRooms(this);" 
          building-id = "${buildingId}"
          building-name = "${buildingName}"
          class="text-success">${buildingName}</a>
          </li>
          <li class="breadcrumb-item">
          <a href="#" 
          onclick="event.preventDefault(); ShowAdminRoomDesks(this);" 
          room-id="${roomId}" 
          room-name="${roomName}"
          building-name="${buildingName}"  
          building-id="${buildingId}"  
          class="text-success">${roomName}</a>
          </li>
          <li class="breadcrumb-item">
          <a href="#" class="text-white">${deskName} (Rezervácie)</a>
          </li>
         
      </ol>
      </nav>
      <hr style="border: 2px solid #28a745" />
      <div class="container-fluid">
      <div class="row mt-1" id="parent">
          <!-- karty idú sem -->
      </div>
      </div>
      </div>
       `;
   loadDeskReservations(deskId);
}

function loadDeskReservations(deskId) {
   const deskIdJson = {
      id: deskId,
   };
   postData(deskIdJson, "/getReservationsByDeskId")
      .then((deskReservations) => {
         showDeskReservations(formatDeskReservations(deskReservations, deskId));
      })
      .catch((error) => {
         console.error(error);
      });
}

function formatDeskReservations(reservations, deskId) {
   const formattedObject = reservations.map((reservation) => {
      const formatedTimeFrom = formatDateTime(reservation.timeFrom);
      const formatedTimeTo = formatDateTime(reservation.timeTo);
      return {
         reservationId: reservation._id,
         buildingName: reservation.deskId.roomId.buildingId.name,
         roomName: reservation.deskId.roomId.roomName,
         deskName: reservation.deskId.deskName,
         deskId: deskId,
         userName: reservation.userId.name,
         userId: reservation.userId._id,
         userEmail: reservation.userId.email,
         userPhone: reservation.userId.phoneNumber,
         date: formatedTimeFrom.date,
         timeFrom: formatedTimeFrom.time,
         timeTo: formatedTimeTo.time,
      };
   });
   return formattedObject;
}

function showDeskReservations(reservations_formatted) {
   const adminUserInfo = getLoginSession();
   let parent_element = document.getElementById("parent");
   parent_element.innerHTML = "";
   reservations_formatted.forEach((reservation) => {
      parent_element.innerHTML += `
       <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
             <div class="desk-mate-karta ce1">
                 <a href="#" style="text-decoration: none">
                 <h3 class="text-white ce2">${reservation.userName}</h3>
                 </a>
                 <hr style="border: 2px solid #28a745" />
                 <ul>
                   <li><h5 class="text-white">Zavolať: 
                   <a href="tel:${reservation.userPhone}" class="text-success">${reservation.userPhone}</a></h5>
                   </li>
                  
                 </ul>
                 <hr style="border: 2px solid #28a745" />
                 <h5><span class="text-success">Dátum:</span> ${reservation.date}</h5>
                 <h5 class="text-success" style="margin-top:15px;">Čas: <span class="text-white mb-2">
                 ${reservation.timeFrom} - ${reservation.timeTo}
                 </span></h5>
                 <button type="button" 
                 reservation-id="${reservation.reservationId}" 
                 desk-id="${reservation.deskId}"
                 building-name="${reservation.buildingName}"
                 room-name="${reservation.roomName}"
                 desk-name="${reservation.deskName}"
                 admin-name="${adminUserInfo.name}"
                 admin-email="${adminUserInfo.email}"
                 user-email="${reservation.userEmail}"
                 date="${reservation.date}"
                 time-from="${reservation.timeFrom}"
                 time-to="${reservation.timeTo}"
                 class="btn btn-outline-danger mt-1"
                 onclick="destroyDeskReservationByAdmin(this)"
                  >Delete reservation</button>
             </div>
       </div>
       `;
   });
}

function destroyDeskReservationByAdmin(button) {
   const id = button.getAttribute("reservation-id");
   const deskId = button.getAttribute("desk-id");
   const buildingName = button.getAttribute("building-name");
   const roomName = button.getAttribute("room-name");
   const deskName = button.getAttribute("desk-name");
   const adminName = button.getAttribute("admin-name");
   const adminEmail = button.getAttribute("admin-email");
   const userEmail = button.getAttribute("user-email");
   const date = button.getAttribute("date");
   const timeFrom = button.getAttribute("time-from");
   const timeTo = button.getAttribute("time-to");
   const deleteInfoJson = {
      id,
      deskId,
      buildingName,
      roomName,
      deskName,
      adminName,
      adminEmail,
      userEmail,
      date,
      timeFrom,
      timeTo,
   };
   postData(deleteInfoJson, "/adminDeleteReservation")
      .then(() => {
         loadDeskReservations(deskId);
      })
      .catch((error) => {
         console.error(error);
      });
}
