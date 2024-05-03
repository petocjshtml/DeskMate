function ShowUserReservationSystem() {
   if (!checkUserSession()) {
      return;
   }
   const userInfo = getLoginSession();
   document.getElementById("render").innerHTML = `
   <div class="body-obsah">
         <nav class="navbar navbar-expand-lg" style="background: rgba(0, 0, 0, 0.5)">
            <a class="navbar-brand text-success" href="#" onclick="ShowUserReservations()">DeskMate</a>
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
                  <a class="nav-item nav-link text-white" href="#" onclick="ShowUserReservationSystem()" style="color: white"
                     ><i class="fas fa-user-alt"></i> Rezervačný systém</a
                  >
                  <a class="nav-item nav-link text-success" href="#" onclick="ShowUserProfile()" style="color: white"
                     ><i class="fas fa-user-alt"></i> ${userInfo.name}</a
                  >
                  <a class="nav-item nav-link text-success" href="#" onclick="deleteUserSession();ShowMainPageHTML();" 
                  style="color: white"
                     ><i class="fas fa-sign-out-alt"></i> Odhlásiť sa</a
                  >
               </div>
            </div>
         </nav>

         <nav aria-label="breadcrumb">
            <ol class="breadcrumb mt-1" id="navigationUserUI" style="background: rgba(0, 0, 0, 0.5)">
               <li class="breadcrumb-item text-success">${userInfo.name}</li>
             
               <li class="breadcrumb-item">
                  <a href="#" class="text-white" onclick="backToRooms()" id="building_nav_user_ui"></a>
               </li>
            </ol>
         </nav>

         <div class="container-fluid">
            <div id="reservationFilterUserUI">
            <form class="form-inline">
            <div class="form-group mb-3 mr-3">
            <div class="input-group">
               <div class="input-group-prepend">
                  <span class="input-group-text bg-success text-white" id="basic-addon1">Dátum</span>
               </div>
               <input type="date" oninput="inputValueChanges(event)" class="form-control " id="datePicker" name="datePicker" aria-label="Dátum" aria-describedby="basic-addon1"/>
            </div>
            </div>
              
               <div class="form-group mb-3 mr-3">
                  <div class="dropdown buildings-dropdown">
                     <button
                        class="btn btn-success dropdown-toggle"
                        type="button"
                        id="buildingsDropdownButtonUserUI"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style="min-width: 206px; text-align: left;"
                     >
                        
                     </button>
                     <div class="buildings-dropdown">
                        <div
                        class="dropdown-menu"
                        id="buildingsDropdownMenuUserUI"
                        style="max-height: 400px; overflow-y: auto; width: 100%">
                           
                        </div>
                     </div>
                    
                  </div>
               </div>
               <div class="form-group mb-3 mr-3">
               <div class="input-group">
                  <div class="input-group-prepend">
                     <span class="input-group-text bg-success text-white" >Počet ľudí</span>
                  </div>
                  <input id="numberOfPeopleInput" oninput="inputValueChanges(event)" type="number" value="4" min="1" class="form-control " 
                  style="width: 60px;" aria-label="Počet ľudí" aria-describedby="basic-addon1"/>
               </div>
               </div>
               <div class="form-group mb-3 mr-3">
               <input type="text" id="roomFilterUserUI"  class="form-control"
                oninput="inputValueChanges(event)" placeholder="Filter miestnosti"/>
               </div>

               <div class="form-group mb-3 mr-3">
               <div class="input-group">
                  <div class="input-group-prepend">
                     <span class="input-group-text" id="basic-addon1">Filter Vybavenia</span>
                  </div>
                  <button class="btn btn-outline-success dropdown-toggle"
                  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  id="equipmentsDropdownUserUIButton"
                  style="min-width: 200px;border-radius:0px; text-align: left; padding-left: 23px">Premietačka</button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" 
                  id="equipmentsDropdownUserUIMenu"
                  style="max-height: 208px; overflow-y: auto; min-width: 200px;">
                   <a class="dropdown-item" href="#">Premietačka</a>
                   <a class="dropdown-item" href="#">Kávovar</a>
                   <a class="dropdown-item" href="#">Virtualná tabuľa</a>
                   
                  </div>
                  <div class="input-group-append">
                     <button type="button" class="btn btn-outline-success" onclick="addEquipmentToFilter()">
                     <i class="fas fa-plus"></i>
                     </button>
                  </div>
               </div>
            </div>
       
               
               <div class="form-group mb-3 mr-3">
               <div class="input-group">
                  <div class="input-group-prepend">
                     <span class="input-group-text" id="basic-addon1">Filter času</span>
                  </div>
                  <button class="btn btn-outline-success dropdown-toggle" id="timeDropdownButtonUserUI"
                   type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    style="min-width: 111px;border-radius:0px; text-align: left; padding-left: 23px">14:00</button>
                  <div class="dropdown-menu" id="timeDropdownMenuUserUI" aria-labelledby="dropdownMenuButton" style="max-height: 208px; overflow-y: auto; min-width: 111px;">
                  
                  </div>
                  <div class="input-group-append">
                     <button type="button" onclick="addTimeToFilter()" class="btn btn-outline-success">
                     <i class="fas fa-plus"></i>
                     </button>
                  </div>
               </div>
            </div>
       
               <div class="form-group mb-3 mr-3">
               <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-success" onclick="changeRoomDesk(this)" disabled id="enableTableFilter">Stôl</button>
                  <button type="button" class="btn btn-outline-success" onclick="changeRoomDesk(this)" id="enableRoomFilter" disabled>Celá miestnosť</button>
               </div>
               </div>
               <div class="form-group mb-3 mr-3" id="filtered_times_container"></div>
               <div class="form-group mb-3 mr-3" id="filtered_equipments_container"></div>
            </form>
            </div>
         </div>

         <hr style="border: 2px solid #28a745" />

         <div class="container-fluid">
            <div class="row mt-1" id="parent">
               <!--  výpis kariet javascriptom sem -->
            </div>
         </div>
      </div>
   `;

   //aby nemohol používateľ vybrať starší dátum
   var today = new Date().toISOString().slice(0, 10);
   document.getElementById("datePicker").setAttribute("min", today);
   showCurrentDate();
   loadBuildingsFromDbUserUI();
   loadDropdownTimes(getHalfHourTimes());
}

function showCurrentDate() {
   var today = new Date().toISOString().split("T")[0];
   document.getElementById("datePicker").value = today;
}

function getSelectedDate() {
   return document.getElementById("datePicker").value;
}

function loadBuildingsFromDbUserUI() {
   getData("/getAllBuildings")
      .then((buildings) => {
         if (buildings.length > 0) {
            showBuildingNamesInDropdown(buildings);
            showBuildingStats(buildings[0]._id);
         }
      })
      .catch((error) => {
         console.error(error);
      });
}

function getSelectedBuildingName() {
   return document.getElementById("buildingsDropdownButtonUserUI").innerText;
}

function showBuildingNamesInDropdown(buildings) {
   const buildingsDropdownMenu = document.getElementById("buildingsDropdownMenuUserUI");
   const buildingsDropdownButton = document.getElementById("buildingsDropdownButtonUserUI");
   const navigation = document.getElementById("building_nav_user_ui");
   navigation.setAttribute("building-id", buildings[0]._id);
   navigation.innerText = buildings[0].name;
   buildingsDropdownButton.setAttribute("building-id", buildings[0]._id);
   buildingsDropdownButton.innerText = buildings[0].name;
   buildingsDropdownMenu.innerHTML = "";
   buildings.forEach((building) => {
      buildingsDropdownMenu.innerHTML += `<a class="dropdown-item"
      onclick="chooseBuilding(this)"
      building-id="${building._id}" href="#">${building.name}</a>`;
   });
}

function chooseBuilding(button) {
   const currentBuildingId = button.getAttribute("building-id");
   const currentBuildingName = button.innerText;
   const dropdownChoosenBuildingButton = document.getElementById("buildingsDropdownButtonUserUI");
   const navigation = document.getElementById("building_nav_user_ui");
   dropdownChoosenBuildingButton.setAttribute("building-id", currentBuildingId);
   dropdownChoosenBuildingButton.innerText = currentBuildingName;
   navigation.innerText = currentBuildingName;
   setBuildingId(currentBuildingId);
   deleteAllEquipmentsFromFilter();
   showBuildingStats(currentBuildingId);
}

function showBuildingStats(buildingId) {
   const buildingIdJsonData = {
      id: buildingId,
   };
   postData(buildingIdJsonData, "/getBuildingWithAllNestedObjects")
      .then((building_with_objects) => {
         const equipment_names = getUniqueEquipmentNames(building_with_objects);
         if (equipment_names.length > 0) {
            showEquipmentNamesInDropdown(equipment_names);
         }
         addReservationsToData(building_with_objects);
      })
      .catch((error) => {
         console.error(error);
      });
}

function showEquipmentNamesInDropdown(equipment_names) {
   const equipments_dropdown_button = document.getElementById("equipmentsDropdownUserUIButton");
   const equipments_dropdown_menu = document.getElementById("equipmentsDropdownUserUIMenu");
   equipments_dropdown_button.innerText = equipment_names[0];
   equipments_dropdown_menu.innerHTML = "";
   equipment_names.forEach((name) => {
      equipments_dropdown_menu.innerHTML += `<a class="dropdown-item" onclick="chooseEquipment(this)" href="#">${name}</a>`;
   });
}

function getUniqueEquipmentNames(building_with_objects) {
   const uniqueEquipmentNames = new Set();
   building_with_objects.rooms.forEach((room) => {
      room.desks.forEach((desk) => {
         desk.equipmentIds.forEach((equipment) => {
            uniqueEquipmentNames.add(equipment.name);
         });
      });
   });
   return Array.from(uniqueEquipmentNames);
}

function chooseEquipment(button) {
   document.getElementById("equipmentsDropdownUserUIButton").innerHTML = button.innerHTML;
}

function addEquipmentToFilter() {
   const choosen_equipment_name = document.getElementById(
      "equipmentsDropdownUserUIButton"
   ).innerText;
   if (choosen_equipment_name.trim().length > 0) {
      const filtered_equipments_container = document.getElementById(
         "filtered_equipments_container"
      );
      const existingButtons = filtered_equipments_container.getElementsByTagName("button");
      let isExisting = Array.from(existingButtons).some(
         (button) => button.innerText === choosen_equipment_name
      );

      if (!isExisting) {
         filtered_equipments_container.innerHTML += `
         <button type="button" class="btn btn-outline-danger mr-3" onclick="deleteEquipmentFromFilter(this)">
         ${choosen_equipment_name}
         </button>
      `;
         showBuildingStats(getBuildingId());
      }
   }
}

function getEquipments() {
   const filtered_equipments_container = document.getElementById("filtered_equipments_container");
   const existingButtons = filtered_equipments_container.getElementsByTagName("button");
   return Array.from(existingButtons).map((equipment) => equipment.innerText);
}

function deleteEquipmentFromFilter(button) {
   button.remove();
   showBuildingStats(getBuildingId());
}

function deleteAllEquipmentsFromFilter() {
   const filtered_equipments_container = document.getElementById("filtered_equipments_container");
   filtered_equipments_container.innerHTML = "";
}

function getTimes() {
   const filtered_times_container = document.getElementById("filtered_times_container");
   const existingButtons = filtered_times_container.getElementsByTagName("button");
   return Array.from(existingButtons).map((equipment) => equipment.innerText);
}

function getNearestHalfHour() {
   const now = new Date();
   const minutes = now.getMinutes();
   const hour = now.getHours();
   if (minutes < 30) {
      return `${hour.toString().padStart(2, "0")}:30`;
   } else {
      const nextHour = (hour + 1) % 24;
      return `${nextHour.toString().padStart(2, "0")}:00`;
   }
}

function getHalfHourTimes() {
   let times = [];
   for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
         times.push(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`);
      }
   }
   return times;
}

function loadDropdownTimes(times_array) {
   const time_dropdown_button = document.getElementById("timeDropdownButtonUserUI");
   const time_dropdown_menu = document.getElementById("timeDropdownMenuUserUI");
   time_dropdown_button.innerText = getNearestHalfHour();
   time_dropdown_menu.innerHTML = "";
   times_array.forEach((time) => {
      time_dropdown_menu.innerHTML += `<a class="dropdown-item" onclick="chooseTime(this)" href="#">${time}</a>`;
   });
}

function chooseTime(dropdown_item) {
   document.getElementById("timeDropdownButtonUserUI").innerText = dropdown_item.innerText;
}

function addTimeToFilter() {
   const choosen_time = document.getElementById("timeDropdownButtonUserUI").innerText;
   if (choosen_time.trim().length > 0) {
      const filtered_times_container = document.getElementById("filtered_times_container");
      const existingButtons = filtered_times_container.getElementsByTagName("button");
      let isExisting = Array.from(existingButtons).some(
         (button) => button.innerText === choosen_time
      );

      if (!isExisting) {
         filtered_times_container.innerHTML += `
         <button type="button" class="btn btn-outline-danger mr-3" onclick="deleteTimeFromFilter(this)">
         ${choosen_time}
         </button>
         `;
         enablePrivacyButtons();
         showBuildingStats(getBuildingId());
      }
   }
}

function deleteTimeFromFilter(button) {
   button.remove();
   const filtered_times_container = document.getElementById("filtered_times_container");
   const existingButtons = filtered_times_container.getElementsByTagName("button");
   if (existingButtons.length === 0) {
      disablePrivacyButtons();
   }
   showBuildingStats(getBuildingId());
}

function enablePrivacyButtons() {
   const tableFilterPrivacyButton = document.getElementById("enableTableFilter");
   const roomFilterPrivacyButton = document.getElementById("enableRoomFilter");
   tableFilterPrivacyButton.disabled = false;
   roomFilterPrivacyButton.disabled = false;
}

function disablePrivacyButtons() {
   const tableFilterPrivacyButton = document.getElementById("enableTableFilter");
   const roomFilterPrivacyButton = document.getElementById("enableRoomFilter");
   tableFilterPrivacyButton.classList.remove("btn-outline-success");
   tableFilterPrivacyButton.classList.add("btn-success");
   roomFilterPrivacyButton.classList.remove("btn-success");
   roomFilterPrivacyButton.classList.add("btn-outline-success");
   tableFilterPrivacyButton.disabled = true;
   roomFilterPrivacyButton.disabled = true;
}

function isRoomFilterOn() {
   return document.getElementById("enableRoomFilter").classList.contains("btn-success");
}

function inputValueChanges(event) {
   showBuildingStats(getBuildingId());
}

function getNumberOfPeople() {
   return parseInt(document.getElementById("numberOfPeopleInput").value, 10);
}

function getRoomName() {
   return document.getElementById("roomFilterUserUI").value;
}

function changeRoomDesk(button) {
   const tableFilterPrivacyButton = document.getElementById("enableTableFilter");
   const roomFilterPrivacyButton = document.getElementById("enableRoomFilter");
   if (button === tableFilterPrivacyButton) {
      tableFilterPrivacyButton.classList.remove("btn-outline-success");
      tableFilterPrivacyButton.classList.add("btn-success");
      roomFilterPrivacyButton.classList.remove("btn-success");
      roomFilterPrivacyButton.classList.add("btn-outline-success");
   } else {
      tableFilterPrivacyButton.classList.add("btn-outline-success");
      tableFilterPrivacyButton.classList.remove("btn-success");
      roomFilterPrivacyButton.classList.add("btn-success");
      roomFilterPrivacyButton.classList.remove("btn-outline-success");
   }
   showBuildingStats(getBuildingId());
}

function getBuildingId() {
   const navigation = document.getElementById("building_nav_user_ui");
   return navigation.getAttribute("building-id");
}

function setBuildingId(building_id) {
   const navigation = document.getElementById("building_nav_user_ui");
   navigation.setAttribute("building-id", building_id);
}

function getBuildingDeskIds(building_nested_data) {
   const deskIds = [];
   building_nested_data.rooms.forEach((room) => {
      room.desks.forEach((desk) => {
         deskIds.push(desk._id);
      });
   });
   return deskIds;
}

function getFilterObject() {
   const filterObject = {};
   filterObject.date = getSelectedDate();
   filterObject.buildingName = getSelectedBuildingName();
   filterObject.buildingId = getBuildingId();
   filterObject.peopleNumber = getNumberOfPeople();
   filterObject.roomName = getRoomName();
   filterObject.equipments = getEquipments();
   filterObject.times = getTimes();
   filterObject.isRoomFilterOn = isRoomFilterOn();
   return filterObject;
}

function addReservationsToData(buildingNestedData) {
   const deskArrayJson = {
      deskArray: getBuildingDeskIds(buildingNestedData),
   };

   postData(deskArrayJson, "/getAllReservationsOfDeskArray")
      .then((buildingReservations) => {
         const buildingDataFull = assignReservationsToDesks(
            buildingNestedData,
            buildingReservations
         );
         getFilteredData(buildingDataFull, getFilterObject());
      })
      .catch((error) => {
         console.error(error);
      });
}

function assignReservationsToDesks(building, reservations) {
   const buildingClone = JSON.parse(JSON.stringify(building));
   buildingClone.rooms.forEach((room) => {
      room.desks.forEach((desk) => {
         desk.reservations = reservations.filter(
            (reservation) => reservation.deskId._id === desk._id
         );
      });
   });
   return buildingClone;
}

function filterByRoomName(building, filterObject) {
   const specifiedRoomName = filterObject.roomName;
   const filteredBuilding = JSON.parse(JSON.stringify(building));
   filteredBuilding.rooms = filteredBuilding.rooms.filter((room) =>
      room.roomName.includes(specifiedRoomName)
   );
   return filteredBuilding;
}

function filterByDate(building, filterObject) {
   const specifiedDate = filterObject.date;
   if (!specifiedDate) {
      console.error("No date specified in the filter object.");
      return;
   }
   const filteredBuilding = JSON.parse(JSON.stringify(building));
   filteredBuilding.rooms.forEach((room) => {
      room.desks.forEach((desk) => {
         desk.reservations = desk.reservations.filter((reservation) => {
            const reservationDate = new Date(reservation.dateTime).toISOString().split("T")[0];
            return reservationDate === specifiedDate;
         });
      });
   });
   return filteredBuilding;
}

function filterByEquipments(building, filterObject) {
   const equipmentNames = filterObject.equipments;
   const filteredBuilding = JSON.parse(JSON.stringify(building));

   filteredBuilding.rooms = filteredBuilding.rooms.filter((room) => {
      room.desks = room.desks.filter((desk) => {
         const deskEqupmentNames = desk.equipmentIds.map((equipment) => equipment.name);
         return equipmentNames.every((element) => deskEqupmentNames.includes(element));
      });
      return room.desks.length > 0;
   });
   return filteredBuilding;
}

function filterByRoomEquipments(building, filterObject) {
   const equipmentNames = filterObject.equipments;
   const filteredBuilding = JSON.parse(JSON.stringify(building));

   filteredBuilding.rooms = filteredBuilding.rooms.filter((room) => {
      return room.desks.some((desk) => {
         const deskEquipmentNames = desk.equipmentIds.map((equipment) => equipment.name);
         return equipmentNames.every((element) => deskEquipmentNames.includes(element));
      });
   });
   return filteredBuilding;
}

function extractTimeHHmm(datetime) {
   const date = new Date(datetime);
   let hours = date.getUTCHours();
   let minutes = date.getUTCMinutes();

   hours = hours.toString().padStart(2, "0");
   minutes = minutes.toString().padStart(2, "0");
   return `${hours}:${minutes}`;
}

function filterByPeopleNumberAndTime(building, filterObject) {
   const peopleNumber = filterObject.peopleNumber;
   const isRoomFilterOn = filterObject.isRoomFilterOn;
   const filteredBuilding = JSON.parse(JSON.stringify(building));
   const times = filterObject.times;

   if (times.length > 0) {
      if (isRoomFilterOn) {
         filteredBuilding.rooms = filteredBuilding.rooms.filter((room) => {
            var isRoomInTimesReservationEmpty = true;
            var roomPeopleNumber = 0;
            room.desks.some((desk) => {
               roomPeopleNumber += desk.peopleNumber;
               const reservationTimesInFormatHHmm = desk.reservations.map((reservation) =>
                  extractTimeHHmm(reservation.dateTime)
               );
               isRoomInTimesReservationEmpty = !times.some((time) =>
                  reservationTimesInFormatHHmm.includes(time)
               );
               return !isRoomInTimesReservationEmpty;
            });
            return roomPeopleNumber >= peopleNumber && isRoomInTimesReservationEmpty;
         });
      } else {
         filteredBuilding.rooms = filteredBuilding.rooms.filter((room) => {
            room.desks = room.desks.filter((desk) => {
               const reservationTimesInFormatHHmm = desk.reservations.map((reservation) =>
                  extractTimeHHmm(reservation.dateTime)
               );
               const isDeskInSomeOfGivenTimesReservated = reservationTimesInFormatHHmm.some((res) =>
                  times.includes(res)
               );
               return desk.peopleNumber >= peopleNumber && !isDeskInSomeOfGivenTimesReservated;
            });
            return room.desks.length > 0;
         });
      }
   } else {
      filteredBuilding.rooms = filteredBuilding.rooms.filter((room) => {
         room.desks = room.desks.filter((desk) => {
            return desk.peopleNumber >= peopleNumber;
         });
         return room.desks.length > 0;
      });
   }
   return filteredBuilding;
}

function getFilteredData(building, filterObject) {
   const filteredDataByRoomName = filterByRoomName(building, filterObject);
   const filteredDataByDate = filterByDate(filteredDataByRoomName, filterObject);
   var filteredDataByEquipments = "";
   if (filterObject.isRoomFilterOn) {
      filteredDataByEquipments = filterByRoomEquipments(filteredDataByDate, filterObject);
   } else {
      filteredDataByEquipments = filterByEquipments(filteredDataByDate, filterObject);
   }
   const filteredDataByPeopleNumberAndTime = filterByPeopleNumberAndTime(
      filteredDataByEquipments,
      filterObject
   );
   ShowRoomsToUser(filteredDataByPeopleNumberAndTime);
}

function ShowHideEquipments(button) {
   const list_of_equpments = button.nextElementSibling;
   if (list_of_equpments.style.display === "none") {
      list_of_equpments.style.display = "block";
   } else {
      list_of_equpments.style.display = "none";
   }
}

function getRoomCardDesksHtmlUserUI(desks) {
   var desksHtml = "";
   desks.forEach((desk) => {
      desksHtml += `<h5 style="cursor:pointer;" 
      onclick="ShowHideEquipments(this)">${desk.deskName} <i class="fas fa-chevron-down"></i></h5>`;
      desksHtml += `<ul style="display:none">`;
      desksHtml += `<li class="text-success">Počet osôb: <span class="text-white">${desk.peopleNumber}</span></li>`;
      desksHtml += `${getRoomCardDeskEquipmentsHtmlUserUI(desk.equipmentIds)}`;
      desksHtml += `</ul> `;
   });
   return desksHtml;
}

function getRoomCardDeskEquipmentsHtmlUserUI(equipments) {
   var equpmentsHtml = "";
   equipments.forEach((equipment) => {
      equpmentsHtml += `<li>${equipment.name}</li>`;
   });
   return equpmentsHtml;
}

var filteredDataGlobal = {};
function ShowRoomsToUser(filteredData) {
   filteredDataGlobal = filteredData;
   let parent_element = document.getElementById("parent");
   parent_element.innerHTML = "";
   filteredData.rooms.forEach((room) => {
      const collapsId = `room-colaps${room._id}`;
      parent_element.innerHTML += `
       <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
          <div class="desk-mate-karta" >
             <a href="#" 
             style="text-decoration: none"
                ><h2 class="text-white">${room.roomName}</h2>
             </a>
             <hr style="border: 2px solid #28a745" />
             <h3 class="text-success">${room.roomLocation}</h3>    
             <hr style="border: 2px solid #28a745" />
             ${getRoomCardDesksHtmlUserUI(room.desks)}
             <hr style="border: 2px solid #28a745" />
             <button type="button"
             room-id="${room._id}"
             class="btn btn-outline-danger" 
             onclick="OpenRoomReservationUI(this)">
             Prezrieť rezervácie</button>
          </div>
       </div>
       `;
   });
}

function hideFilter() {
   document.getElementById("reservationFilterUserUI").style.display = "none";
}

function showFilter() {
   document.getElementById("reservationFilterUserUI").style.display = "block";
}

function OpenRoomReservationUI(button) {
   hideFilter();
   let parent_element = document.getElementById("parent");
   const roomId = button.getAttribute("room-id");
   const room = filteredDataGlobal.rooms.filter((room) => room._id === roomId)[0];
   showRoomNameInNavigation(room.roomName);
   parent_element.innerHTML = "";
   room.desks.forEach((desk) => {
      var equpipmentNames = desk.equipmentIds.map((equipment) => equipment.name).join(", ");

      if (equpipmentNames.length === 0) {
         equpipmentNames = "Bez vybavenia";
      }
      const deskReservations = desk.reservations.map((reservation) =>
         extractTimeHHmm(reservation.dateTime)
      );
      parent_element.innerHTML += `
       <div class="col-sm-12  mb-3">
          <div class="desk-mate-karta" >
             <a href="#" 
             style="text-decoration: none"
                ><h2 class="text-white">${desk.deskName}</h2>
             </a>
          
             <hr style="border: 2px solid #28a745" />
             <h5>${equpipmentNames}</h5>
             <hr style="border: 2px solid #28a745" />
             <form class="form-inline">
             <div style="display: none;">
                  
             </div>
               <div class="form-group mb-3 mr-3 confirmTimeButtons" style="width:100%;max-height:260px;overflow: auto;">
               ${generateReservationButtonsHtml(deskReservations)} 
               </div>
             </form>
             <div class="btn-group confirmReservationButtons" role="group" aria-label="Basic example">
             <button type="button" class="btn btn-outline-danger" desk-id="${
                desk._id
             }" onclick="createReservation(this)" disabled>Rezervovať</button>
             <button type="button" style="display:none;" class="btn btn-outline-success" onclick="denieReservationTime(this)">Naspäť</button>             
             </div>
          </div>
       </div>
       `;
   });
}

function isFutureDate(inputDate, inputTime) {
   const dateTimeInput = new Date(`${inputDate}T${inputTime}:00`);
   const now = new Date();
   return dateTimeInput > now;
}

function generateReservationButtonsHtml(reservations) {
   const date = getSelectedDate();
   var generatedReservationButtonsHtml = "";
   const times = getHalfHourTimes();
   times.forEach((time) => {
      if (isFutureDate(date, time)) {
         if (reservations.includes(time)) {
            generatedReservationButtonsHtml += `
            <button type="button" class="btn btn-outline-danger disabled mr-3 mb-3" 
            style="border:1px solid red;color:red;">
            ${time}
            </button>
            `;
         } else {
            generatedReservationButtonsHtml += `
            <button type="button" class="btn btn-outline-success mr-3 mb-3" onclick="chooseReservationTime(this)">
            ${time}
            </button>
            `;
         }
      } else {
         generatedReservationButtonsHtml += `
            <button type="button" class="btn btn-outline-warning disabled mr-3 mb-3"> 
            ${time}
            </button>
            `;
      }
   });
   return generatedReservationButtonsHtml;
}

function chooseReservationTime(button) {
   const timesParentElement = button.parentElement;
   const informElement = timesParentElement.previousElementSibling;
   const choosenTime = button.innerText.trim();
   informElement.style.display = "block";
   informElement.innerHTML = `<h5>Tvoj vybraný čas rezervácie je <span class="text-success">${choosenTime}</span></h5>
   <hr style="border: 2px solid #28a745" />
   `;
   timesParentElement.style.display = "none";
   const deskMateCard = button.closest(".desk-mate-karta");
   const buttonGroupContainer = deskMateCard.querySelector(".confirmReservationButtons");
   buttonGroupContainer.children[0].disabled = false;
   buttonGroupContainer.children[1].style.display = "block";
}

function denieReservationTime(button) {
   const deskMateCard = button.closest(".desk-mate-karta");
   const timesParentElement = deskMateCard.querySelector(".confirmTimeButtons");
   const informElement = timesParentElement.previousElementSibling;
   button.previousElementSibling.disabled = true;
   button.style.display = "none";
   informElement.style.display = "none";
   timesParentElement.style.display = "block";
}

function showRoomNameInNavigation(roomName) {
   document.getElementById("building_nav_user_ui").classList.remove("text-white");
   document.getElementById("building_nav_user_ui").classList.add("text-success");
   document.getElementById("navigationUserUI").innerHTML += `
   <li class="breadcrumb-item" id="roomNameItemUserUI">
          <a href="#" class="text-white">${roomName}</a>
   </li>
   `;
}

function backToRooms() {
   const dropdownChoosenBuildingButton = document.getElementById("buildingsDropdownButtonUserUI");
   const buildingId = dropdownChoosenBuildingButton.getAttribute("building-id");
   showFilter();
   document.getElementById("roomNameItemUserUI").remove();
   document.getElementById("building_nav_user_ui").classList.remove("text-success");
   document.getElementById("building_nav_user_ui").classList.add("text-white");
   showBuildingStats(buildingId);
}

function createTimeForMongoDB(time, baseDate) {
   const [hours, minutes] = time.split(":").map(Number);
   const date = baseDate ? new Date(baseDate) : new Date();
   date.setUTCHours(hours, minutes, 0, 0);
   return date;
}

function createReservation(button) {
   const deskMateCart = button.closest(".desk-mate-karta");
   const timesParentElement = deskMateCart.querySelector(".confirmTimeButtons");
   const informElement = timesParentElement.previousElementSibling;
   const timeSpan = informElement.querySelector(".text-success");
   const userInfo = getLoginSession();
   const dateOfReservation = document.getElementById("datePicker").value;
   const reservationTime = timeSpan.innerText.trim();
   const reservationTimeMongo = createTimeForMongoDB(reservationTime, dateOfReservation);
   const deskId = button.getAttribute("desk-id");
   const userId = userInfo._id;
   const reservationJson = {
      deskId: deskId,
      userId: userId,
      dateTime: reservationTimeMongo,
   };

   postData(reservationJson, "/addReservation")
      .then(() => {
         ShowUserReservations();
      })
      .catch((error) => {
         console.error(error);
      });
}
