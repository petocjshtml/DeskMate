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
               <input type="date" oninput="inputValueChanges()" class="form-control " id="datePicker" name="datePicker" aria-label="Dátum" aria-describedby="basic-addon1"/>
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
                     <span class="input-group-text bg-success text-white" >Počet stolov</span>
                  </div>
                  <input id="numberOfDesksInput" oninput="inputValueChanges()" type="number" value="1" min="0" class="form-control " 
                  style="width: 60px;" aria-label="Počet ľudí" aria-describedby="basic-addon1"/>
               </div>
               </div>
               <div class="form-group mb-3 mr-3">
               <input type="text" id="roomFilterUserUI"  class="form-control"
                oninput="inputValueChanges()" placeholder="Filter miestnosti"/>
               </div>
               <div class="form-group mb-3 mr-3">
               <div class="input-group">
                  <div class="input-group-prepend">
                     <span class="input-group-text bg-success text-white" id="basic-addon1">Filter Vybavenia</span>
                  </div>
                  <button class="btn btn-outline-light dropdown-toggle"
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
                     <button type="button" class="btn btn-light" onclick="addEquipmentToFilter()">
                     <i class="fas fa-plus"></i>
                     </button>
                  </div>
               </div>
               </div>
               <div class="form-group mb-3 mr-3">
               <div class="input-group">
                  <div class="input-group-prepend">
                     <span class="input-group-text bg-success text-white" id="basic-addon1">Filter času (od - do)</span>
                  </div>
                  <div>
                  <button class="btn btn-outline-light dropdown-toggle"
                  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  id="timeFromButton"
                  style="min-width: 100px;border-radius:0px; text-align: left; padding-left: 23px"></button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" 
                  id="timeFromDropdown"
                  style="max-height: 208px; overflow-y: auto; min-width: 80px;">
                  </div>
                  </div>
                  <div>
                  <button class="btn btn-outline-light dropdown-toggle"
                  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  id="timeToButton"
                  style="min-width: 100px;border-radius:0px; text-align: left; padding-left: 23px"></button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" 
                  id="timeToDropdown"
                  style="max-height: 208px; overflow-y: auto; min-width: 80px;">
                  </div>
                  </div>
                  <div class="input-group-append">
                     <button type="button" class="btn btn-light" onclick="addTimeToFilter()">
                     <i class="fas fa-plus"></i>
                     </button>
                  </div>
               </div>
               </div>
               <div class="form-group mb-3 mr-3">
                  <div class="btn-group" role="group" aria-label="Basic example">
                     <button type="button" onclick="chooseTimePeriod(this)" name="vlastnyCas" class="btn btn-success">Vlastný čas</button>
                     <button type="button" onclick="chooseTimePeriod(this)" name="ranoObed" class="btn btn-outline-success">Ráno - obed</button>
                     <button type="button" onclick="chooseTimePeriod(this)" name="obedVecer" class="btn btn-outline-success">Obed - večer</button>
                     <button type="button" onclick="chooseTimePeriod(this)" name="celyDen" class="btn btn-outline-success">Celý deň</button>
                  </div>
               </div>
               <div class="form-group mb-3 mr-3">
               <div class="btn-group" id="privacyButtonsParent" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-success text-white" onclick="privacyFilterSwitch(this)"  id="enableTableFilter" disabled>Stôl</button>
                  <button type="button" class="btn btn-outline-success text-white" onclick="privacyFilterSwitch(this)" id="enableRoomFilter" disabled>Celá miestnosť</button>
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

   setReservationTimePeriod();
   showCurrentDate();
   loadBuildingsFromDbUserUI();
   setTimeDropdowns();
}

function isRoomPrivacyAllowed() {
   const roomFilterBtn = document.getElementById("enableRoomFilter");
   return roomFilterBtn.classList.contains("btn-success");
}

function privacyFilterSwitch(button) {
   const buttons = button.parentNode.querySelectorAll("button");
   Array.from(buttons).forEach((button) => {
      button.classList.remove("btn-success");
      button.classList.add("btn-outline-success");
   });
   button.classList.add("btn-success");
   inputValueChanges();
}

function getNearestHalfHourFromCurrentDate() {
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

function convertTimeToDateTime(time) {
   const [hour, minute] = time.split(":");
   const date = new Date();
   date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
   return date;
}

function updateTimeToDropdown(selectedTime) {
   const timeToDropdown = document.getElementById("timeToDropdown");
   const timeToButton = document.getElementById("timeToButton");
   const times = getHalfHourTimes();
   times.push("24:00");
   const selectedDateTime = convertTimeToDateTime(selectedTime);
   timeToDropdown.innerHTML = "";
   const filteredTimes = times.filter((time) => {
      const comparisonResult = convertTimeToDateTime(time) > selectedDateTime;
      return comparisonResult;
   });
   if (filteredTimes.length === 0) filteredTimes.push("24:00");
   filteredTimes.forEach((time) => {
      const itemTo = document.createElement("a");
      itemTo.className = "dropdown-item";
      itemTo.href = "#";
      itemTo.textContent = time;
      itemTo.onclick = () => {
         timeToButton.textContent = time;
      };
      timeToDropdown.appendChild(itemTo);
   });
   timeToButton.textContent = filteredTimes[0];
}

function setTimeDropdowns() {
   const times = getHalfHourTimes();
   const timeFromDropdown = document.getElementById("timeFromDropdown");
   const timeToDropdown = document.getElementById("timeToDropdown");
   const timeFromButton = document.getElementById("timeFromButton");
   timeFromDropdown.innerHTML = "";
   timeToDropdown.innerHTML = "";
   const initialTime = getNearestHalfHourFromCurrentDate();
   timeFromButton.textContent = initialTime;
   updateTimeToDropdown(initialTime);
   times.forEach((time) => {
      const itemFrom = document.createElement("a");
      itemFrom.className = "dropdown-item";
      itemFrom.href = "#";
      itemFrom.textContent = time;
      itemFrom.onclick = () => {
         timeFromButton.textContent = time;
         updateTimeToDropdown(time);
      };
      timeFromDropdown.appendChild(itemFrom);
   });
}

function chooseTimePeriod(button) {
   const chooseTimeButtons = button.parentNode.querySelectorAll("button");
   const timeFromButton = document.getElementById("timeFromButton");
   const timeToButton = document.getElementById("timeToButton");
   Array.from(chooseTimeButtons).forEach((btn) => {
      if (btn.classList.contains("btn-success")) {
         btn.classList.remove("btn-success");
         btn.classList.add("btn-outline-success");
      }
   });
   button.classList.remove("btn-outline-success");
   button.classList.add("btn-success");
   switch (button.name) {
      case "vlastnyCas":
         timeFromButton.disabled = false;
         timeToButton.disabled = false;
         setTimeDropdowns();
         break;
      case "ranoObed":
         timeFromButton.textContent = "00:00";
         timeToButton.textContent = "12:00";
         timeFromButton.disabled = true;
         timeToButton.disabled = true;
         break;
      case "obedVecer":
         timeFromButton.textContent = "12:00";
         timeToButton.textContent = "24:00";
         timeFromButton.disabled = true;
         timeToButton.disabled = true;
         break;
      case "celyDen":
         timeFromButton.textContent = "00:00";
         timeToButton.textContent = "24:00";
         timeFromButton.disabled = true;
         timeToButton.disabled = true;
         break;
   }
}

function addTimeToFilter() {
   const timeFromButton = document.getElementById("timeFromButton");
   const timeToButton = document.getElementById("timeToButton");
   const timeFrom = timeFromButton.textContent.trim();
   const timeTo = timeToButton.textContent.trim();
   const filteredTimesContainer = document.getElementById("filtered_times_container");
   if (timeFrom && timeTo && timeFrom !== "Choose Time" && timeTo !== "Choose Time") {
      const newRangeStart = convertTimeToMinutes(timeFrom);
      const newRangeEnd = convertTimeToMinutes(timeTo);
      if (newRangeStart >= newRangeEnd) {
         return;
      }
      const existingButtons = Array.from(filteredTimesContainer.getElementsByTagName("button"));
      const isOverlapping = existingButtons.some((button) => {
         const [existingFrom, existingTo] = button.textContent
            .split(" - ")
            .map((time) => convertTimeToMinutes(time.trim()));
         return newRangeStart < existingTo && newRangeEnd > existingFrom;
      });
      if (!isOverlapping) {
         const timeButton = document.createElement("button");
         timeButton.type = "button";
         timeButton.className = "btn btn-outline-danger mr-3";
         timeButton.textContent = `${timeFrom} - ${timeTo}`;
         timeButton.onclick = function () {
            deleteTimeFromFilter(this);
         };
         filteredTimesContainer.appendChild(timeButton);
      }
   }
   inputValueChanges();
   enablePrivacyButtons();
}

function enablePrivacyButtons() {
   document.getElementById("enableTableFilter").disabled = false;
   document.getElementById("enableRoomFilter").disabled = false;
}

function disablePrivacyButtons() {
   const enableTableFilterBtn = document.getElementById("enableTableFilter").disabled;
   const enableRoomFilterBtn = document.getElementById("enableRoomFilter").disabled;
   enableRoomFilterBtn.classList.remove("btn-success");
   enableRoomFilterBtn.classList.add("btn-outline-success");
   enableTableFilterBtn.classList.remove("btn-outline-success");
   enableRoomFilterBtn.classList.add("btn-success");
   enableTableFilterBtn.disabled = true;
   enableRoomFilterBtn.disabled = true;
}

function getFilteringTimes() {
   const filtered_times_container = document.getElementById("filtered_times_container");
   const filtered_time_buttons = filtered_times_container.querySelectorAll("button");
   var filtered_times = [];
   Array.from(filtered_time_buttons).forEach((button) =>
      filtered_times.push(button.innerText.trim())
   );
   filtered_times = filtered_times.map((time) => {
      return { timeFrom: time.slice(0, 5), timeTo: time.slice(8, 13) };
   });
   return filtered_times;
}

function convertTimeToMinutes(time) {
   const [hours, minutes] = time.split(":").map(Number);
   return hours * 60 + minutes;
}

function setReservationTimePeriod() {
   var today = new Date();
   //7 dní (dni-hodiny-minuty-sekundy-milisekundy)
   var nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
   //aby nemohol používateľ vybrať starší dátum
   document.getElementById("datePicker").setAttribute("min", today.toISOString().slice(0, 10));
   //umožňí rezervácie iba týždeň dopredu
   document.getElementById("datePicker").setAttribute("max", nextWeek.toISOString().slice(0, 10));
}

function showCurrentDate() {
   var today = new Date().toISOString().split("T")[0];
   document.getElementById("datePicker").value = today;
}

function getSelectedDate() {
   return document.getElementById("datePicker").value;
}

function switchBetweenDeskRoomFilter(button) {}

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

function backToRooms() {
   showFilter();
   document.getElementById("roomNameItemUserUI").remove();
   document.getElementById("building_nav_user_ui").classList.remove("text-success");
   document.getElementById("building_nav_user_ui").classList.add("text-white");
   document.getElementById("parent").innerHTML = "";
   ShowRoomsToUser(filteredDataGlobal);
}

function deleteTimeFromFilter(button) {
   button.remove();
   inputValueChanges();
   const timeFilteredButtonsLength = document
      .getElementById("filtered_times_container")
      .querySelectorAll("button").length;
   if (timeFilteredButtonsLength === 0) {
      disablePrivacyButtons();
   }
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

function inputValueChanges() {
   showBuildingStats(getBuildingId());
}

function getNumberOfDesks() {
   return parseInt(document.getElementById("numberOfDesksInput").value, 10);
}

function getRoomName() {
   return document.getElementById("roomFilterUserUI").value;
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
   filterObject.desksNumber = getNumberOfDesks();
   filterObject.roomName = getRoomName();
   filterObject.equipments = getEquipments();
   filterObject.timesForTimeFilter = getFilteringTimes();
   filterObject.isRoomPrivacyAllowed = isRoomPrivacyAllowed();
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
            const reservationDate = new Date(reservation.timeFrom).toISOString().split("T")[0];
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

function areTimesNonOverlapping(times1, times2) {
   function getTimeInMilliseconds(timeString) {
      const date = new Date(`1970-01-01T${timeString}:00Z`);
      return date.getTime();
   }
   for (const time1 of times1) {
      const time1From = getTimeInMilliseconds(time1.timeFrom);
      const time1To = getTimeInMilliseconds(time1.timeTo);

      for (const time2 of times2) {
         const time2From = new Date(time2.timeFrom).getTime();
         const time2To = new Date(time2.timeTo).getTime();
         if (time1From < time2To && time1To > time2From) {
            return false;
         }
      }
   }
   return true;
}

function convertFilterTimeToDate(time, date) {
   const [hours, minutes] = time.split(":").map(Number);
   const [year, month, day] = date.split("-").map(Number);
   const resultDate = new Date(year, month - 1, day, hours, minutes);
   resultDate.setHours(resultDate.getHours() + 2);
   return resultDate;
}

function convertDbReservationTimeTODate(timeStr) {
   return new Date(timeStr);
}

function checkTimeOverlap(timeRange, filterTimes) {
   const inputFrom = new Date(timeRange.timeFrom);
   const inputTo = new Date(timeRange.timeTo);
   for (let filter of filterTimes) {
      const filterFrom = new Date(filter.timeFrom);
      const filterTo = new Date(filter.timeTo);
      if (inputFrom < filterTo && inputTo > filterFrom) {
         return false;
      }
   }
   return true;
}

function filterByTimes(building, filterObject) {
   const isRoomPrivacyAllowed = filterObject.isRoomPrivacyAllowed;
   const times = filterObject.timesForTimeFilter;
   const selectedDate = getSelectedDate();
   const timesForTimeFilter = times.map((time) => {
      return {
         timeFrom: convertFilterTimeToDate(time.timeFrom, selectedDate),
         timeTo: convertFilterTimeToDate(time.timeTo, selectedDate),
      };
   });
   if (timesForTimeFilter.length === 0) {
      return building;
   }
   const filteredBuilding = JSON.parse(JSON.stringify(building));
   if (isRoomPrivacyAllowed) {
      filteredBuilding.rooms = filteredBuilding.rooms.filter((room) => {
         const desksLengthInit = room.desks.length;
         room.desks = room.desks.filter((desk) => {
            const isOneOverlap = desk.reservations.every((reservation) => {
               const reservationTimeNormalized = {
                  timeFrom: convertDbReservationTimeTODate(reservation.timeFrom),
                  timeTo: convertDbReservationTimeTODate(reservation.timeTo),
               };
               return checkTimeOverlap(reservationTimeNormalized, timesForTimeFilter);
            });
            return isOneOverlap;
         });
         return desksLengthInit === room.desks.length;
      });
   } else {
      filteredBuilding.rooms = filteredBuilding.rooms.filter((room) => {
         room.desks = room.desks.filter((desk) => {
            const isOneOverlap = desk.reservations.every((reservation) => {
               const reservationTimeNormalized = {
                  timeFrom: convertDbReservationTimeTODate(reservation.timeFrom),
                  timeTo: convertDbReservationTimeTODate(reservation.timeTo),
               };
               return checkTimeOverlap(reservationTimeNormalized, timesForTimeFilter);
            });
            return isOneOverlap;
         });
         return room.desks.length > 0;
      });
   }
   return filteredBuilding;
}

function filterByDesksNumberInRoom(building, filterObject) {
   const desksNumber = filterObject.desksNumber;
   const filteredBuilding = JSON.parse(JSON.stringify(building));
   filteredBuilding.rooms = filteredBuilding.rooms.filter((room) => {
      return room.desks.length >= desksNumber;
   });
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
   const filteredDataByTimes = filterByTimes(filteredDataByEquipments, filterObject);
   const filteredDataByDesksNumberInRoom = filterByDesksNumberInRoom(
      filteredDataByTimes,
      filterObject
   );
   ShowRoomsToUser(filteredDataByDesksNumberInRoom);
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

function showRoomNameInNavigation(roomName) {
   document.getElementById("building_nav_user_ui").classList.remove("text-white");
   document.getElementById("building_nav_user_ui").classList.add("text-success");
   document.getElementById("navigationUserUI").innerHTML += `
   <li class="breadcrumb-item" id="roomNameItemUserUI">
          <a href="#" class="text-white">${roomName}</a>
   </li>
   `;
}

function normalizeReservationTimesForDeskUI(desk) {
   return desk.reservations.flatMap((reservation) => {
      const result = [];
      let currentTime = new Date(reservation.timeFrom);
      const endTime = new Date(reservation.timeTo);
      while (currentTime < endTime) {
         result.push({
            reservator: reservation.userId,
            desk: desk,
            timeButton: currentTime.toISOString().substring(11, 16),
         });
         currentTime.setUTCMinutes(currentTime.getUTCMinutes() + 30);
      }
      return result;
   });
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
      const deskReservations = normalizeReservationTimesForDeskUI(desk);
      parent_element.innerHTML += `
       <div class="col-sm-12  mb-3">
          <div class="desk-mate-karta" >
             <a href="#" 
             style="text-decoration: none"
                ><h2 class="text-white">${desk.deskName}</h2>
             </a>
          
             <hr style="border: 2px solid #28a745" />
             <h5>${equpipmentNames}</h5>
             <div class="reservationTimeParent" style="display:none">
                  
             </div>
             <hr style="border: 2px solid #28a745" />
             <div class="btn-group mb-3 timePeriods" role="group" aria-label="Basic example">
             ${getDeskTimePeriodButtonsHtml(deskReservations)} 
             </div>
             <form class="form-inline">
          
               <div class="form-group mb-3 mr-3 confirmTimeButtons" style="width:100%;max-height:260px;overflow: auto;">
               ${getReservationButtonsHtml(deskReservations)} 
               </div>
             </form>
             <div class="btn-group confirmReservationButtons" role="group" aria-label="Basic example">
             <div class="btn-group mb-3 confirmOrDenieReservations" style="display:none;" 
             role="group" aria-label="Basic example">
             <button type="button" class="btn btn-outline-danger" desk-id="${
                desk._id
             }" onclick="createReservation(this)">Rezervovať</button>          
             </div>
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

function isReservatedSomeTimeFromMorningToMidday(reservations) {
   return reservations.some((reservation) => {
      const [hours, minutes] = reservation.timeButton.split(":").map(Number);
      return hours < 12 || (hours === 11 && minutes <= 30);
   });
}

function isReservatedSomeTimeFromMiddayToEvening(reservations) {
   return reservations.some((reservation) => {
      const [hours, minutes] = reservation.timeButton.split(":").map(Number);
      return (hours >= 12 && hours < 24) || (hours === 23 && minutes <= 30);
   });
}

function isTimePeriodBeforeMidday() {
   const now = new Date();
   return now.getHours() < 11 || (now.getHours() === 11 && now.getMinutes() <= 30);
}

function chooseTimes(button) {
   const timeButtonsAll = button.parentNode.parentNode
      .querySelector(".confirmTimeButtons")
      .querySelectorAll(".timeBtn");
   Array.from(timeButtonsAll).forEach((timeButton) => {
      if (!timeButton.classList.contains("btn-outline-warning")) {
         timeButton.classList.remove("btn-success");
         timeButton.classList.add("btn-outline-success");
      }
   });

   if (button.name === "doobeda") {
      for (let index = 0; index < 24; index++) {
         selectReservationTime(timeButtonsAll[index]);
      }
   }
   if (button.name === "poobede") {
      for (let index = 24; index < timeButtonsAll.length; index++) {
         selectReservationTime(timeButtonsAll[index]);
      }
   }
   if (button.name === "celyden") {
      for (let index = 0; index < timeButtonsAll.length; index++) {
         selectReservationTime(timeButtonsAll[index]);
      }
   }
}

function getDeskTimePeriodButtonsHtml(reservations) {
   var deskTimePeriodButtonsHtml = "";
   const isToday = new Date().toISOString().split("T")[0] === getSelectedDate();
   if (isToday) {
      deskTimePeriodButtonsHtml = `
      <button type="button" class="btn btn-outline-success" onclick="chooseTimes(this)" name="doobeda" 
      ${
         isReservatedSomeTimeFromMorningToMidday(reservations) || !isTimePeriodBeforeMidday()
            ? "disabled"
            : ""
      }>ráno - obed</button>
      <button type="button" class="btn btn-outline-success" onclick="chooseTimes(this)" name="poobede" ${
         isReservatedSomeTimeFromMiddayToEvening(reservations) ? "disabled" : ""
      }>obed - večer</button>
      <button type="button" class="btn btn-outline-success" onclick="chooseTimes(this)" name="celyden" ${
         reservations.length !== 0 ? "disabled" : ""
      }>celý deň</button>
      `;
   } else {
      deskTimePeriodButtonsHtml = `
      <button type="button" class="btn btn-outline-success" onclick="chooseTimes(this)" name="doobeda" 
      ${
         isReservatedSomeTimeFromMorningToMidday(reservations) ? "disabled" : ""
      }>ráno - obed</button>
      <button type="button" class="btn btn-outline-success" onclick="chooseTimes(this)" name="poobede" ${
         isReservatedSomeTimeFromMiddayToEvening(reservations) ? "disabled" : ""
      }>obed - večer</button>
      <button type="button" class="btn btn-outline-success" onclick="chooseTimes(this)" name="celyden" ${
         reservations.length !== 0 ? "disabled" : ""
      }>celý deň</button>
      `;
   }

   return deskTimePeriodButtonsHtml;
}

function getReservationButtonsHtml(reservations) {
   const date = getSelectedDate();
   var generatedReservationButtonsHtml = "";
   const times = getHalfHourTimes();
   times.forEach((time) => {
      const timeReservation = reservations.find((reservation) => reservation.timeButton === time);
      if (timeReservation) {
         var desk_id = timeReservation.desk._id;
         var modal_id = `modal-${desk_id}-${time.replace(":", "")}`;
         var modal_label_id = `modal-label-${modal_id}`;
         var info_obj = {};
         info_obj.modalId = modal_id;
         info_obj.modalLabelId = modal_label_id;
         info_obj.reservatorName = timeReservation.reservator.name;
         info_obj.reservatiorPhone = timeReservation.reservator.phoneNumber;
         info_obj.reservatorEmail = timeReservation.reservator.email;
         info_obj.time = time;
         generatedReservationButtonsHtml += `${showUserInfoModal(info_obj)}`;
      } else {
         if (isFutureDate(date, time)) {
            generatedReservationButtonsHtml += `
               <button type="button" isSelected="false" class="btn btn-outline-success mr-3 mb-3 timeBtn" onclick="selectReservationTime(this)">
               ${time}
               </button>
               `;
         } else {
            generatedReservationButtonsHtml += `
               <button type="button" class="btn btn-outline-warning mr-3 mb-3 timeBtn" disabled> 
               ${time}
               </button>
               `;
         }
      }
   });
   return generatedReservationButtonsHtml;
}

function getTimeButtons(button) {
   const buttonParent = button.parentNode;
   return buttonParent.querySelectorAll("button");
}

function unmarkReservationTimes(button) {
   const buttons = getTimeButtons(button);
   Array.from(buttons).forEach((button) => {
      if (button.classList.contains("btn-success")) {
         button.classList.remove("btn-success");
         button.classList.add("btn-outline-success");
      }
   });
}

function isTimeButtonSiblingMarked(button) {
   const previousButton = button.previousElementSibling;
   const nextButton = button.nextElementSibling;
   var isPreviousButtonMarked = false;
   var isNextButtonMarked = false;
   if (previousButton !== null) {
      isPreviousButtonMarked = previousButton.classList.contains("btn-success");
   }
   if (nextButton !== null) {
      isNextButtonMarked = nextButton.classList.contains("btn-success");
   }
   return isPreviousButtonMarked || isNextButtonMarked;
}

function addHalfHour(timeString) {
   let [h, m] = timeString.split(":");
   return m === "00" ? `${h}:${"30"}` : `${String((+h + 1) % 24).padStart(2, "0")}:00`;
}

function showReservationTime(button) {
   const currentDeskTimeButtons = button.parentNode.querySelectorAll("button");
   const selectedTimeButtons = Array.from(currentDeskTimeButtons).filter((button) =>
      button.classList.contains("btn-success")
   );
   const timeFrom = selectedTimeButtons[0].textContent.trim();
   const timeTo = addHalfHour(
      selectedTimeButtons[selectedTimeButtons.length - 1].textContent.trim()
   );
   const choosenReservationTimeStr = `${timeFrom} - ${timeTo}`;
   const reservationTimeParent =
      button.parentNode.parentNode.parentNode.querySelector(".reservationTimeParent");
   reservationTimeParent.style.display = "block";
   reservationTimeParent.innerHTML = `
   <hr style="border: 2px solid #28a745" />
   <h5>Rezervačný čas: ${choosenReservationTimeStr}</h5>
   `;
}

function hideReservationTime(button) {
   const reservationTimeParent =
      button.parentNode.parentNode.parentNode.querySelector(".reservationTimeParent");
   reservationTimeParent.style.display = "none";
}

function showOrHideOrderReservationButton(button) {
   const isSomeTimeButtonSelected = Array.from(button.parentNode.querySelectorAll("button")).some(
      (button) => button.classList.contains("btn-success")
   );
   if (isSomeTimeButtonSelected) {
      button.parentNode.parentNode.parentNode.querySelector(
         ".confirmOrDenieReservations"
      ).style.display = "block";
      showReservationTime(button);
   } else {
      button.parentNode.parentNode.parentNode.querySelector(
         ".confirmOrDenieReservations"
      ).style.display = "none";
      hideReservationTime(button);
   }
}

function selectReservationTime(button) {
   const isButtonMarked = button.classList.contains("btn-success");
   if (isButtonMarked) {
      unmarkReservationTimes(button);
   } else {
      if (!button.classList.contains("btn-outline-warning")) {
         if (isTimeButtonSiblingMarked(button)) {
            button.classList.remove("btn-outline-success");
            button.classList.add("btn-success");
         } else {
            unmarkReservationTimes(button);
            button.classList.remove("btn-outline-success");
            button.classList.add("btn-success");
         }
      }
   }
   showOrHideOrderReservationButton(button);
}

function normalizeTimeFromTimeToForMongo(dateString, selectedTimeButtons) {
   const times = selectedTimeButtons.map((button) => button.innerText.trim());
   const timeFromString = times[0];
   const timeToString = times[times.length - 1];
   const timeFrom = new Date(`${dateString}T${timeFromString}:00Z`);
   let timeTo = new Date(`${dateString}T${timeToString}:00Z`);
   timeTo.setMinutes(timeTo.getMinutes() + 30);
   return { timeFrom, timeTo };
}

function createReservation(button) {
   const buttonsForm = button.parentNode.parentNode.parentNode
      .querySelector(".confirmTimeButtons")
      .querySelectorAll("button");
   const selectedTimeButtons = Array.from(buttonsForm).filter((button) => {
      return button.classList.contains("btn-success");
   });
   const reservationObject = normalizeTimeFromTimeToForMongo(
      getSelectedDate(),
      selectedTimeButtons
   );
   reservationObject.deskId = button.getAttribute("desk-id");
   reservationObject.userId = getLoginSession()._id;
   postData(reservationObject, "/addReservation")
      .then(() => {
         ShowUserReservations();
      })
      .catch((error) => {
         console.error(error);
      });
}
