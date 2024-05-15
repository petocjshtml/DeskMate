function ShowAdminBuildings() {
   if (!checkAdminSession()) {
      return;
   }
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
             <a class="nav-item nav-link text-success" onclick="ShowAdminProfile()" href="#" style="color: white"
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
             <a href="#" class="text-white">Budovy</a>
          </li>
       </ol>
    </nav>

    <div class="container-fluid">
       <form class="form-inline">
          <div class="form-group mb-3 mr-3">
             <button type="button" onclick="event.preventDefault(); AddBuilding();" class="btn btn-outline-success">
                Pridať budovu
             </button>
          </div>
          <div class="form-group mb-3 mr-3">
             <input
                id="building_form_name"
                type="search"
                class="form-control"
                placeholder="Názov budovy"
                style="width: 458px"
             />
          </div>
          <div class="form-group mb-3">
             <input
                id="building_form_location"
                type="search"
                class="form-control"
                placeholder="Lokalita budovy"
                style="width: 458px"
             />
          </div>
       </form>
    </div>

    <hr style="border: 2px solid #28a745" />

    <div class="container-fluid">
       <div class="row mt-1" id="parent">
          <!--  výpis kariet javascriptom sem -->
       </div>
    </div>
    </div>
     `;
   LoadBuildingsFromDb();
}

function AddBuilding() {
   const name = document.getElementById("building_form_name").value;
   const location = document.getElementById("building_form_location").value;
   const building = {
      name: name,
      location: location,
   };
   postData(building, "/addBuilding")
      .then(() => {
         LoadBuildingsFromDb();
      })
      .catch(() => {
         alert("Chyba pri pridávaní budovy");
      });
}

function EditBuilding(button) {
   const modalContent = button.closest(".modal-content");
   const inputs = modalContent.querySelectorAll("input");
   const id = inputs[0].value;
   const new_name = inputs[1].value;
   const new_location = inputs[2].value;
   const building_edited = {
      id: id,
      updateData: {
         name: new_name,
         location: new_location,
      },
   };
   postData(building_edited, "/updateBuilding")
      .then(() => {
         LoadBuildingsFromDb();
      })
      .catch(() => {
         alert("Chyba pri editovaní budovy");
      });
}

function DeleteBuilding(button) {
   const building_karta = button.closest(".desk-mate-karta");
   const id_to_delete = building_karta.getAttribute("mongo-id");
   const delete_info = {
      id: id_to_delete,
   };

   postData(delete_info, "/deleteBuilding")
      .then(() => {
         LoadBuildingsFromDb();
      })
      .catch(() => {
         alert("Chyba pri editovaní budovy");
      });
}

function LoadBuildingsFromDb() {
   getData("/getAllBuildings")
      .then((data) => {
         showBuildingsFromDb(data);
      })
      .catch((error) => {
         console.error(error);
      });
}

function showBuildingsFromDb(buildings) {
   let parent_element = document.getElementById("parent");
   //Aby sa nepridali rovnaké objekty
   parent_element.innerHTML = "";
   buildings.forEach((building) => {
      parent_element.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
         <div class="desk-mate-karta" mongo-id="${building._id}">
            <a href="#" 
               onclick="event.preventDefault(); ShowAdminBuildingRooms(this);" 
               building-id = "${building._id}"
               building-name = "${building.name}"
               style="text-decoration: none"
               ><h3 class="text-white">${building.name}</h3>
            </a>
            <hr style="border: 2px solid #28a745" />
            <h5 class="ce3">${building.location}</h5>
            <hr style="border: 2px solid #28a745" />
            <div class="btn-group" role="group" aria-label="Basic example">
            ${showEditBuildingModal(building._id, building.name, building.location)}
               <button
                  type="button"
                  class="btn btn-outline-danger ce6"
                  onclick="DeleteBuilding(this)"
               >
                  Delete
               </button>
            </div>
         </div>
      </div>
      `;
   });
}
