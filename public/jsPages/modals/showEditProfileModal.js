function showEditProfileModal(session) {
   const modalID = `editProfileModal-${session._id}`;
   return `
     <!-- Button trigger modal -->
     <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#${modalID}">
     Edit Profile
     </button>
     <!-- Modal -->
     <div class="modal fade" id="${modalID}"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
         <div class="modal-content">
         <div class="modal-header">
             <h5 class="modal-title" style="color:black" id="exampleModalLabel">Edit Admin Profile</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
             </button>
         </div>
         <div class="modal-body" style="color:black">
             <div class="form-group">
                <input type="text" value="${session.name}" id="name_admin"  class="form-control modal-input" placeholder="Admin name">
             </div>
             <div class="form-group">
                 <input type="text" value="${session.email}" id="email_admin"  class="form-control modal-input" placeholder="Admin email">
             </div>
             <div class="form-group">
                 <input type="text" value="${session.phoneNumber}" id="phone_number_admin"  class="form-control modal-input" placeholder="Admin phone number">
             </div>
             <div class="form-group">
                 <input type="password"  value="${session.password}" id="password_admin" class="form-control modal-input" placeholder="Admin password">
             </div>
         </div>
         <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
             <button type="button" admin-id="${session._id}" onclick="SaveAdminProfileEditChanges(this)"  class="btn btn-primary" data-dismiss="modal">Save changes</button>
         </div>
         </div>
     </div>
     </div>
     `;
}

function SaveAdminProfileEditChanges(button) {
   const adminId = button.getAttribute("admin-id");
   const name = document.getElementById("name_admin").value;
   const email = document.getElementById("email_admin").value;
   const phoneNumber = document.getElementById("phone_number_admin").value;
   const password = document.getElementById("password_admin").value;
   const userUpdateJson = {
      id: adminId,
      updateData: {
         name: name,
         email: email,
         password: password,
         phoneNumber: phoneNumber,
      },
   };

   postData(userUpdateJson, "/editUser")
      .then((editedUser) => {
         updateUserSession(editedUser);
         ShowAdminProfile();
      })
      .catch((error) => {
         console.error(error);
      });
}
