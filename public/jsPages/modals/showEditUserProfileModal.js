function showEditUserProfileModal(session) {
   const modalID = `editProfileModal-${session._id}`;
   return `
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#${modalID}">
          Upraviť profil
      </button>
      <!-- Modal -->
      <div class="modal fade" id="${modalID}"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" style="color:black" id="exampleModalLabel">Úprava profilu:</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body" style="color:black">
              <div class="form-group">
                 <input type="text" value="${session.name}" id="name_user"  class="form-control modal-input" placeholder="Meno">
              </div>
              <div class="form-group">
                  <input type="text" value="${session.email}" id="email_user"  class="form-control modal-input" placeholder="Email">
              </div>
              <div class="form-group">
                  <input type="text" value="${session.phoneNumber}" id="phone_number_user"  class="form-control modal-input" placeholder="Telefónne číslo">
              </div>
              <div class="form-group">
                  <input type="password"  value="${session.password}" id="password_user" class="form-control modal-input" placeholder="Heslo">
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Zavrieť</button>
              <button type="button" user-id="${session._id}" onclick="SaveUserProfileEditChanges(this)"  class="btn btn-primary" data-dismiss="modal">Uložiť zmeny</button>
          </div>
          </div>
      </div>
      </div>
      `;
}

function SaveUserProfileEditChanges(button) {
   const userId = button.getAttribute("user-id");
   const name = document.getElementById("name_user").value;
   const email = document.getElementById("email_user").value;
   const phoneNumber = document.getElementById("phone_number_user").value;
   const password = document.getElementById("password_user").value;
   const userUpdateJson = {
      id: userId,
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
         ShowUserProfile();
      })
      .catch((error) => {
         console.error(error);
      });
}
