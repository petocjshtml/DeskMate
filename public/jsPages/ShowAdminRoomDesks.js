function ShowAdminRoomDesks(room_link) {
   if (!checkAdminSession()) {
      return;
   }
   const roomId = room_link.getAttribute("room-id");
   const roomName = room_link.getAttribute("room-name");
   const buildingName = room_link.getAttribute("building-name");
   const buildingId = room_link.getAttribute("building-id");
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
     <ol class="breadcrumb mt-1" id="infoNavigation" style="background: rgba(0, 0, 0, 0.5)">
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
         <a href="#" class="text-white">${roomName}</a>
         </li>
     </ol>
     </nav>
 
     <div class="container-fluid">
         <form class="form-inline">
             <div class="form-group mb-3 mr-3">
             <button type="button" onclick="addDesk(this)" room-id="${roomId}" class="btn btn-outline-success">
                 Pridať stôl
             </button>
             </div>
             <div class="form-group mb-3 mr-3">
             <input
                 id="desk_name"
                 type="search"
                 class="form-control"
                 placeholder="Názov stolu"
                 style="width: 150px"
             />
             </div>
 
             <div class="form-group mb-3 mr-3">
             <span class="text-white">Počet ľudí:</span>
             </div>
 
             <div class="form-group mb-3 mr-3">
             <input
                 id="number_of_people"
                 type="number"
                 value="4"
                 class="form-control"
                 placeholder="Kapacita stolu"
                 style="width: 100px"
             />
             </div>
 
             <div class="form-group mb-3 mr-3">
             <div class="input-group">
             <input type="text" class="form-control" id="equipment_input" placeholder="Nové vybavenie" aria-label="Text input with dropdown button">
             <div class="input-group-append">
             <button class="btn btn-outline-success dropdown-toggle" id="dropdownEquipmentsButton" type="button" data-toggle="dropdown" aria-expanded="false">Vyber si vybavenie</button>
             <div class="dropdown-menu dropdownScrollBar" id="equipments-dropdown">
             
             </div>
             </div>
             </div>
             </div>
 
             <div class="form-group mb-3 mr-3">
             <button type="button" onclick="addEquipment()" class="btn btn-outline-danger">
             <i class="fas fa-plus"></i>
             </button>
             </div>

            <div class="form-group mb-3 mr-3">
               <button type="button" onclick="deleteEquipment()" class="btn btn-outline-danger">
                  <i class="far fa-trash-alt"></i>
               </button>
            </div>
            <div class="form-group mb-3 mr-3" id="equipments"></div>
            </form>
     </div>
 
     <hr style="border: 2px solid #28a745" />
 
     <div class="container-fluid">
     <div class="row mt-1" id="parent">
         <!-- karty idú sem -->
     </div>
     </div>
     </div>
      `;
   loadEquipmentsFromDb();
   loadRoomDesksFromDb(roomId);
}

function showEquipmentInInput(link) {
   let equipment_input = document.getElementById("equipment_input");
   equipment_input.value = link.textContent;
}

function loadEquipmentsFromDb() {
   getData("/getAllEquipments")
      .then((data) => {
         showEquipmentsFromDbInDropdown(data);
      })
      .catch((error) => {
         console.error(error);
      });
}

function showEquipmentsFromDbInDropdown(equipments) {
   let equipments_dropdown_parent = document.getElementById("equipments-dropdown");
   equipments_dropdown_parent.innerHTML = "";
   equipments.forEach((equipment) => {
      equipments_dropdown_parent.innerHTML += `
         <a class="dropdown-item d-flex align-items-center"  href="#">
         <i class="far fa-trash-alt text-danger" mongo-id="${equipment._id}" onclick="deleteEquipmentFromDb(this)" 
         style="margin-right: 5px;"></i>
         <span onclick="event.preventDefault(); showEquipmentInInput(this)"> ${equipment.name}</span>
         </a>
       `;
   });
}

function deleteEquipmentFromDb(button) {
   const id_to_delete = button.getAttribute("mongo-id");
   const id_to_delete_json = {
      id: id_to_delete,
   };
   postData(id_to_delete_json, "/deleteEquipment")
      .then(() => {
         loadEquipmentsFromDb();
         $("#dropdownEquipmentsButton").dropdown("toggle");
      })
      .catch((error) => {
         console.error(error);
      });
}

function addEquipment() {
   let equipment = document.getElementById("equipment_input").value;
   document.getElementById("equipment_input").value = "";
   if (equipment.trim().length !== 0) {
      let parent = document.getElementById("equipments");
      parent.innerHTML += `
            <button type="button" class="btn btn-outline-danger prepared-equipment mr-3">
               ${equipment}
            </button>
         `;
   }
}

function deleteEquipment() {
   let elementy = document.getElementsByClassName("prepared-equipment");
   if (elementy.length !== 0) {
      elementy[elementy.length - 1].remove();
   }
}

function addDesk(button) {
   const roomId = button.getAttribute("room-id");
   const deskName = document.getElementById("desk_name").value;
   const numberOfPeople = document.getElementById("number_of_people").value;
   const equipmentElements = document.querySelectorAll(".prepared-equipment");
   let equipments = [];

   equipmentElements.forEach((element) => {
      equipments.push(element.textContent.trim());
   });

   const dataToPost = {
      equipments: equipments,
   };

   postData(dataToPost, "/addEquipments")
      .then(() => {
         postData(dataToPost, "/findEquipmentsByNames")
            .then((equipmentsMongo) => {
               let eq_id_array = equipmentsMongo.map((equipmentMongo) => equipmentMongo.id);
               const new_desk = {
                  roomId,
                  deskName,
                  peopleNumber: parseInt(numberOfPeople, 10),
                  equipmentIds: eq_id_array,
               };
               postData(new_desk, "/addDesk")
                  .then(() => {
                     loadRoomDesksFromDb(roomId);
                     loadEquipmentsFromDb();
                  })
                  .catch((error) => {
                     console.error(error);
                  });
            })
            .catch((error) => {
               console.error(error);
            });
      })
      .catch((error) => {
         console.error(error);
      });
}

function deleteDesk(button) {
   const deskId = button.getAttribute("desk-id");
   const roomId = button.getAttribute("room-id");
   const deskId_json = {
      id: deskId,
   };
   postData(deskId_json, "/deleteDesk")
      .then(() => {
         loadRoomDesksFromDb(roomId);
      })
      .catch((error) => {
         console.error(error);
      });
}

function loadRoomDesksFromDb(room_id) {
   let room_desks_req_obj = {
      id: room_id,
   };

   postData(room_desks_req_obj, "/getAllDesksByRoomId")
      .then((roomDesksFromDb) => {
         showRoomDesksFromDb(roomDesksFromDb);
      })
      .catch((error) => {
         console.error(error);
      });
}

function getLinkInfo() {
   const infoHtmlParent = document.getElementById("infoNavigation");
   const links = infoHtmlParent.querySelectorAll("a");
   const buildingId = links[1].getAttribute("building-id");
   const buildingName = links[1].getAttribute("building-name");
   const roomName = links[2].innerHTML.trim();
   return { buildingId: buildingId, buildingName: buildingName, roomName: roomName };
}

function showRoomDesksFromDb(roomDesksFromDb) {
   let parent_element = document.getElementById("parent");
   const ObjectsInfo = getLinkInfo();
   parent_element.innerHTML = "";
   roomDesksFromDb.forEach((roomDesk) => {
      parent_element.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
            <div class="desk-mate-karta ce1">
                <a href="#" desk-id="${roomDesk._id}" desk-name="${roomDesk.deskName}" 
                room-id="${roomDesk.roomId}" room-name="${ObjectsInfo.roomName}"
                building-id="${ObjectsInfo.buildingId}" building-name="${ObjectsInfo.buildingName}"
                onclick="event.preventDefault(); ShowAdminDeskReservations(this);"
                 style="text-decoration: none">
                <h3 class="text-white ce2">${roomDesk.deskName}</h3>
                </a>
                <hr style="border: 2px solid #28a745" />
                <h5>Počet ľudí: <span class="text-success ce3">${roomDesk.peopleNumber}</span></h5>
                <ul>
                ${getEquipmentsHtml(roomDesk.equipmentIds)}
                </ul>
                <hr style="border: 2px solid #28a745" />
                <div class="btn-group" role="group" aria-label="Basic example">
                 ${showEditDeskModal(roomDesk)}
                <button type="button" onclick="deleteDesk(this)" desk-id="${
                   roomDesk._id
                }" room-id="${roomDesk.roomId}" class="btn btn-outline-danger">Delete</button>
                </div>
            </div>
      </div>
      `;
   });
}

function getEquipmentsHtml(equipments) {
   let equipments_html = "";
   equipments.forEach((equipment) => {
      equipments_html += `<li><h5 class="text-success">${equipment.name}</h5></li>`;
   });
   return equipments_html;
}
