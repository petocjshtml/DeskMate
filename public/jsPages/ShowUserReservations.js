function ShowUserReservations() {
   if (!checkUserSession()) {
      return;
   }
   const userInfo = getLoginSession();
   document.getElementById("render").innerHTML = `
   <div class="body-obsah">
   <nav class="navbar navbar-expand-lg" style="background: rgba(0, 0, 0, 0.5)">
      <a class="navbar-brand text-white" href="#" onclick="ShowUserReservations()">DeskMate</a>
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
            <a class="nav-item nav-link text-success" href="#" onclick="ShowUserReservationSystem()" style="color: white"
               ><i class="fas fa-user-alt"></i> Rezervačný systém</a
            >
            <a class="nav-item nav-link text-success" href="#" onclick="ShowUserProfile()" style="color: white"
               ><i class="fas fa-user-alt"></i> ${userInfo.name}</a
            >
            <a class="nav-item nav-link text-success" href="#" onclick="deleteUserSession();ShowMainPageHTML();" style="color: white"
               ><i class="fas fa-sign-out-alt"></i> Odhlásiť sa</a
            >
         </div>
      </div>
   </nav>

   <nav aria-label="breadcrumb">
      <ol class="breadcrumb mt-1" style="background: rgba(0, 0, 0, 0.5)">
         <li class="breadcrumb-item text-success">${userInfo.name}</li>
         <li class="breadcrumb-item">
            <a href="#" class="text-white">Rezervácie</a>
         </li>
      </ol>
   </nav>

   <hr style="border: 2px solid #28a745" />

   <div class="container-fluid">
      <div class="row mt-1" id="parent">
         <!--  tu zobraziť rezervácie pomocou javascriptu -->
      </div>
   </div>
   </div>
   `;
   loadUserReservations();
}

function loadUserReservations() {
   const userId = getLoginSession()._id;
   const userIdJson = {
      id: userId,
   };
   postData(userIdJson, "/getReservationsByUserId")
      .then((reservations) => {
         showUserReservations(formatUserReservations(reservations));
      })
      .catch((error) => {
         console.error(error);
      });
}

function formatDateTime(isoString) {
   const date = new Date(isoString);
   const formattedDate = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;
   const formattedTime = `${date.getUTCHours().toString().padStart(2, "0")}:${date
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")}`;
   return { date: formattedDate, time: formattedTime };
}

function formatUserReservations(reservations) {
   const formattedObject = reservations.map((reservation) => {
      const formatedTimeFrom = formatDateTime(reservation.timeFrom);
      const formatedTimeTo = formatDateTime(reservation.timeTo);
      return {
         reservationId: reservation._id,
         buildingName: reservation.deskId.roomId.buildingId.name,
         roomName: reservation.deskId.roomId.roomName,
         deskName: reservation.deskId.deskName,
         date: formatedTimeFrom.date,
         timeFrom: formatedTimeFrom.time,
         timeTo: formatedTimeTo.time,
      };
   });
   return formattedObject;
}

function showUserReservations(reservations_formatted) {
   let parent_element = document.getElementById("parent");
   parent_element.innerHTML = "";
   reservations_formatted.forEach((reservation) => {
      parent_element.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="desk-mate-karta ce1">
                <a href="#" style="text-decoration: none">
                <h3 class="text-white ce2">${reservation.buildingName}</h3>
                </a>
                <hr style="border: 2px solid #28a745" />
                <ul>
                  <li><h5 class="text-success">${reservation.roomName}</h5></li>
                  <li><h5 class="text-white">${reservation.deskName}</h5></li>
                 
                </ul>
                <hr style="border: 2px solid #28a745" />
                <h5><span class="text-success">Dátum:</span> ${reservation.date}</h5>
               
                <h5 class="text-success" style="margin-top:15px;">Čas: <span class="text-white mb-2">
                ${reservation.timeFrom} - ${reservation.timeTo}
                </span></h5>
                
                
                <button type="button" reservation-id="${reservation.reservationId}" 
                class="btn btn-outline-danger mt-1"
                onclick="destroyReservation(this)"
                 >Zrušiť rezerváciu</button>
            </div>
      </div>
      `;
   });
}

function destroyReservation(button) {
   const reservationId = button.getAttribute("reservation-id");
   const reservationIdJson = {
      id: reservationId,
   };
   postData(reservationIdJson, "/deleteReservation")
      .then(() => {
         ShowUserReservations();
      })
      .catch((error) => {
         console.error(error);
      });
}
