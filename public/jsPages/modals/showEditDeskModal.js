function showEditDeskModal(desk) {
   const modalID = `editBuildingModal-${desk._id}`;
   const equipmentsID = `equipments-${desk._id}`;
   const equipmentInputId = `equipmentInput-${desk._id}`;
   const nameInputId = `equipmentNameInput-${desk._id}`;
   const peopleNumInputId = `equipmentPeopleNumInput-${desk._id}`;

   return `
     <!-- Button trigger modal -->
     <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#${modalID}">
     Edit
     </button>
     <!-- Modal -->
     <div class="modal fade" id="${modalID}"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
         <div class="modal-content">
         <div class="modal-header">
             <h5 class="modal-title" style="color:black" id="exampleModalLabel">Edit Desk</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
             </button>
         </div>
         <div class="modal-body" style="color:black">
         <div class="form-group">
            <input type="hidden" value="${desk._id}">
            <label for="${nameInputId}">Desk Name (editable):</label>
            <input type="text" id="${nameInputId}" value="${
      desk.deskName
   }" class="form-control modal-input" placeholder="Enter new value">
            </div>
            <div class="form-group">
                <label for="${peopleNumInputId}">Number of people (editable):</label>
                <input type="number" id="${peopleNumInputId}" value="${
      desk.peopleNumber
   }" class="form-control modal-input" placeholder="Enter new value">
            </div>
            <p>Equipments:</p>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button 
                    class="btn btn-outline-danger" 
                    onclick="addEquipmentToDeskHtmlModal(this)" 
                    desk-id="${desk._id}"
                    type="button" 
                    id="button-addon1">
                        Add Equipment
                    </button>
                </div>
                <input type="text" id="${equipmentInputId}" class="form-control" placeholder="Equipment name"
                 aria-label="Example text with button addon" aria-describedby="button-addon1">
                </div>
           
                <ul id="${equipmentsID}">
                ${getEquipmentsHtmlModal(desk.equipmentIds, desk._id)}
                </ul>
           
         </div>
         <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
             <button type="button" onclick="saveChanges(this)" room-id=${desk.roomId}
              desk-id="${
                 desk._id
              }"  class="btn btn-primary" data-dismiss="modal">Save changes</button>
         </div>
         </div>
     </div>
     </div>
     `;
}

function getEquipmentsHtmlModal(equipments, deskId) {
   let equipments_html = "";
   equipments.forEach((equipment) => {
      equipments_html += `<li><h5 class="text-success">
      <i class="far fa-trash-alt mr-3 text-danger" 
      style="cursor:pointer;"
      equipment-id="${equipment._id}" 
      desk-id="${deskId}"
      onclick="deleteEquipmentFromDeskHtmlModal(this)"
      >
      </i>${equipment.name} </h5> </li>`;
   });
   return equipments_html;
}

function deleteEquipmentFromDeskHtmlModal(element) {
   const desk_id = element.getAttribute("desk-id");
   const equipment_id = element.getAttribute("equipment-id");
   let delete_req_json = {
      deskId: desk_id,
      equipmentId: equipment_id,
   };

   postData(delete_req_json, "/removeEquipmentFromDesk")
      .then(() => {
         loadNewEquipmentModalHtml(delete_req_json.deskId);
      })
      .catch((error) => {
         console.error(error);
      });
}

function addEquipmentToDeskHtmlModal(element) {
   const desk_id = element.getAttribute("desk-id");
   const equipmentInputId = `equipmentInput-${desk_id}`;
   const equipment_name = document.getElementById(equipmentInputId).value.trim();
   let equipment_data = {
      name: equipment_name,
   };
   if (equipment_name.length > 0) {
      console.log(equipment_data);
      postData(equipment_data, "/addEquipment")
         .then(() => {
            postData(equipment_data, "/findEquipmentByName")
               .then((equipment_from_db) => {
                  const equipment_id = equipment_from_db._id;
                  const equipmentToDesk = {
                     deskId: desk_id,
                     equipmentId: equipment_id,
                  };
                  postData(equipmentToDesk, "/addEquipmentToDesk")
                     .then((novyDesk) => {
                        //console.log(novyDesk);
                        loadNewEquipmentModalHtml(desk_id);
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
}

function loadNewEquipmentModalHtml(desk_id) {
   const equipmentsID = `equipments-${desk_id}`;
   const equipments_parent_element = document.getElementById(equipmentsID);
   const desk_id_json = {
      id: desk_id,
   };

   postData(desk_id_json, "/selectDeskById")
      .then((updatedDesk) => {
         equipments_parent_element.innerHTML = "";
         console.log(updatedDesk.equipmentIds);

         if (updatedDesk.equipmentIds.length > 0) {
            updatedDesk.equipmentIds.map((equipment) => {
               equipments_parent_element.innerHTML += `<li><h5 class="text-success">
                <i class="far fa-trash-alt mr-3 text-danger" 
                style="cursor:pointer;"
                equipment-id="${equipment._id}" 
                desk-id="${desk_id}"
                onclick="deleteEquipmentFromDeskHtmlModal(this)"
                >
                </i>${equipment.name}</h5></li>`;
            });
         }
      })
      .catch((error) => {
         console.error(error);
      });
}

function saveChanges(button) {
   const id = button.getAttribute("desk-id");
   const roomId = button.getAttribute("room-id");
   const nameInputId = `equipmentNameInput-${id}`;
   const peopleNumInputId = `equipmentPeopleNumInput-${id}`;
   const desk_name_edited = document.getElementById(nameInputId).value;
   const desk_people_num_edited_str = document.getElementById(peopleNumInputId).value;
   const desk_people_num_edited = parseInt(desk_people_num_edited_str, 10);
   console.log(roomId);

   const edit_desk_json = {
      id,
      updateData: {
         deskName: desk_name_edited,
         peopleNumber: desk_people_num_edited,
      },
   };
   postData(edit_desk_json, "/editDesk")
      .then((data) => {
         console.log(data);
         loadRoomDesksFromDb(roomId);
      })
      .catch((error) => {
         console.error(error);
      });
}
