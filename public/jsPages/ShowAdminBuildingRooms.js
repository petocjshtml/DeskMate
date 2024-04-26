function ShowAdminBuildingRooms(building_link) {
   if (!checkAdminSession()) {
      return;
   }
   const buildingId = building_link.getAttribute("building-id");
   const buildingName = building_link.getAttribute("building-name");
   document.getElementById("render").innerHTML = `
    <div class="body-obsah">
    <nav class="navbar navbar-expand-lg" style="background: rgba(0, 0, 0, 0.5)">
        <a class="navbar-brand text-white" href="#" onclick="ShowAdminBuildings();">Administratorské rozhranie</a>
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
            <a class="nav-item nav-link text-success" onclick="ShowAdminRegistrationRequests()" href="#" style="color: white"
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
            <li class="breadcrumb-item">
            <a href="#" onclick="ShowAdminBuildings();" class="text-success">Budovy</a>
            </li>
            <li class="breadcrumb-item">
            <a href="#" class="text-white">${buildingName}</a>
            </li>
        </ol>
    </nav>

    <div class="container-fluid">
        <form class="form-inline">
            <div class="form-group mb-3 mr-3">
            <button type="button" onclick="AddRoom(this)" building-id="${buildingId}" class="btn btn-outline-success">
                Pridať miestnosť
            </button>
            </div>
            <div class="form-group mb-3 mr-3">
            <input
                id="add_room_name"
                type="search"
                class="form-control"
                placeholder="Názov miestnosti"
                style="width: 446px"
            />
            </div>
            <div class="form-group mb-3">
            <input
                id="add_room_name_location"
                type="search"
                class="form-control"
                placeholder="Lokácia miestnosti"
                style="width: 446px"
            />
            </div>
        </form>
    </div>

    <hr style="border: 2px solid #28a745" />
    <div class="container-fluid">
        <div class="row mt-1" id="parent">
            <!--  tu bude obsah vypísaný pomocou javascriptu -->
        </div>
    </div>
    </div>
    `;
   LoadRoomsFromDb(buildingId, buildingName);
}

function LoadRoomsFromDb(buildingId, buildingName) {
   const building_id_json = { id: buildingId };
   postData(building_id_json, "/getAllRoomsByBuildingId")
      .then((data) => {
         ShowRoomsFromDb(data, buildingId, buildingName);
      })
      .catch(() => {
         alert("Chyba pri editovaní budovy");
      });
}

function ShowRoomsFromDb(rooms, buildingId, buildingName) {
   let parent_element = document.getElementById("parent");
   parent_element.innerHTML = "";
   rooms.forEach((room) => {
      parent_element.innerHTML += `
       <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
          <div class="desk-mate-karta" mongo-id="${room._id}">
             <a href="#" onclick="ShowAdminRoomDesks(this)" 
             room-id="${room._id}" 
             room-name="${room.roomName}"
             building-name="${buildingName}"  
             building-id="${buildingId}"  
             style="text-decoration: none"
                ><h3 class="text-white">${room.roomName}</h3>
             </a>
             <hr style="border: 2px solid #28a745" />
             <h5 class="ce3">${room.roomLocation}</h5>
             <hr style="border: 2px solid #28a745" />
             <div class="btn-group" role="group" aria-label="Basic example">
             ${showEditRoomModal(
                room._id,
                buildingId,
                buildingName,
                room.roomName,
                room.roomLocation
             )}
                <button
                   type="button"
                   class="btn btn-outline-danger ce6"
                   building-id=${buildingId}
                   onclick="DeleteRoom(this)"
                >
                   Delete
                </button>
             </div>
          </div>
       </div>
       `;
   });
}

function AddRoom(button) {
   const buildingId = button.getAttribute("building-id");
   const roomName = document.getElementById("add_room_name").value;
   const roomLocation = document.getElementById("add_room_name_location").value;
   const roomObj = {
      buildingId: buildingId,
      roomName: roomName,
      roomLocation: roomLocation,
   };
   postData(roomObj, "/addRoom")
      .then(() => {
         LoadRoomsFromDb(buildingId);
      })
      .catch(() => {
         alert("Chyba pri pridávaní miestnosti");
      });
}

function EditRoom(button) {
   const modalContent = button.closest(".modal-content");
   const buildingName = button.getAttribute("building-name");
   const inputs = modalContent.querySelectorAll("input");
   const buildingId = button.getAttribute("building-id");
   const room_id = inputs[0].value;
   const new_name = inputs[1].value;
   const new_location = inputs[2].value;
   const room_edited = {
      id: room_id,
      updateData: {
         roomName: new_name,
         roomLocation: new_location,
      },
   };
   console.log(room_edited);

   postData(room_edited, "/editRoom")
      .then(() => {
         LoadRoomsFromDb(buildingId, buildingName);
      })
      .catch(() => {
         alert("Chyba pri editovaní budovy");
      });
}

function DeleteRoom(button) {
   const buildingId = button.getAttribute("building-id");
   const room_karta = button.closest(".desk-mate-karta");
   const id_to_delete = room_karta.getAttribute("mongo-id");
   const delete_info = {
      id: id_to_delete,
   };

   postData(delete_info, "/deleteRoom")
      .then(() => {
         LoadRoomsFromDb(buildingId);
      })
      .catch(() => {
         alert("Chyba pri editovaní budovy");
      });
}
