function ShowAdminRoomDesks(room_id) {
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
        <a class="nav-item nav-link text-success" href="#" style="color: white"
            >Registračné žiadosti</a
        >
        <a class="nav-item nav-link text-success" href="#" style="color: white"
            ><i class="fas fa-user-alt"></i> Profil</a
        >
        <a class="nav-item nav-link text-success" href="#" style="color: white"
            ><i class="fas fa-sign-out-alt"></i> Odhlásiť sa</a
        >
        </div>
    </div>
    </nav>

    <nav aria-label="breadcrumb">
    <ol class="breadcrumb mt-1" style="background: rgba(0, 0, 0, 0.5)">
        <li class="breadcrumb-item text-success">Root</li>
        <li class="breadcrumb-item">
        <a href="#" class="text-success">Budovy</a>
        </li>
        <li class="breadcrumb-item">
        <a href="#" class="text-success">Mirage OC Žilina</a>
        </li>
        <li class="breadcrumb-item">
        <a href="#" class="text-white">Stoly</a>
        </li>
    </ol>
    </nav>

    <div class="container-fluid">
        <form class="form-inline">
            <div class="form-group mb-3 mr-3">
            <button type="button" onclick="addDesk(this)" room-id="${room_id}" class="btn btn-outline-success">
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
            <input type="text" class="form-control" id="equipment" placeholder="Nové vybavenie" aria-label="Text input with dropdown button">
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
   loadRoomDesksFromDb();
}

function showEquipmentInInput(link) {
   let equipment_input = document.getElementById("equipment");
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

function loadRoomDesksFromDb() {
   getData("/getAllDesks")
      .then((data) => {
         console.log(data);
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

function addEquipment() {
   let equipment = document.getElementById("equipment").value;
   document.getElementById("equipment").value = "";
   if (equipment.length !== 0) {
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

function deleteEquipmentFromDb(button) {
   const id_to_delete = button.getAttribute("mongo-id");
   const id_to_delete_json = {
      id: id_to_delete,
   };
   postData(id_to_delete_json, "/deleteEquipment")
      .then((data) => {
         loadEquipmentsFromDb();
         $("#dropdownEquipmentsButton").dropdown("toggle");
      })
      .catch((error) => {
         console.error(error);
      });
}

function addDesk(button) {
   let room_id = button.getAttribute("room-id");
   let desk_name = document.getElementById("desk_name").value;
   let desk_number_of_people = document.getElementById("number_of_people").value;
   //aktualizácia vybavení
   let equpment_buttons = document.getElementsByClassName("prepared-equipment");
   let equipment_names = Array.from(equpment_buttons).map((element) => element.innerText);
   let equipment_name_objects = equipment_names.map((equipment) => {
      return { name: equipment };
   });
   let equipments_json = {
      equipments: equipment_name_objects,
   };
   let desk_equipment_names = {
      equipments: equipment_names,
   };

   const deskData = {
      roomId: room_id,
      deskName: desk_name,
      peopleNumber: desk_number_of_people,
      equipmentIds: [],
   };

   postData(equipments_json, "/addEquipments")
      .then((data) => {
         //ďalší post request
         postData(desk_equipment_names, "/findEquipmentsByNames")
            .then((data) => {
               const equipmentIds = data.map((object) => {
                  return object.id;
               });
               deskData.equipmentIds = equipmentIds;
               //ďalší post request
               postData(deskData, "/addDesk")
                  .then((data) => {
                     console.log(data);
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

   //pridanie nového stola
   const desk_to_add = {};
}
