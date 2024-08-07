function ShowAdminProfile() {
   if (!checkAdminSession()) {
      return;
   }
   const adminUserInfo = getLoginSession();
   document.getElementById("render").innerHTML = `
    <div class="body-obsah">
    <nav class="navbar navbar-expand-lg" style="background: rgba(0, 0, 0, 0.5)">
       <a class="navbar-brand text-success" href="#" onclick="ShowAdminBuildings()">Administratorské rozhranie</a>
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
             <a class="nav-item nav-link text-white disabled" onclick="ShowAdminProfile()" href="#" style="color: white"
                ><i class="fas fa-user-alt"></i> Profil</a
             >
             <a class="nav-item nav-link text-success" onclick="deleteUserSession();ShowMainPageHTML();" href="#" style="color: white"
                ><i class="fas fa-sign-out-alt"></i> Odhlásiť sa</a
             >
          </div>
       </div>
    </nav>
    <nav aria-label="breadcrumb">
       <ol class="breadcrumb mt-1" style="background: rgba(0, 0, 0, 0.5)">
          <li class="breadcrumb-item text-success">Root</li>
          <li class="breadcrumb-item">
             <a href="#" class="text-white">${adminUserInfo.name}</a>
          </li>
       </ol>
    </nav>
    <hr style="border: 2px solid #28a745" />
    <div class="container-fluid">
       <div class="row mt-1">
          <div class="col-sm-12 col-md-6 mb-3">
             <div class="desk-mate-karta">
                <span style="font-size: 1.25rem" 
                   >${adminUserInfo.name} &nbsp;&nbsp;(Admin)</span
                >
                <hr style="border: 2px solid #28a745" />
                <ul>
                   <li>Email: <span class="text-success">${adminUserInfo.email}</span></li>
                   <li>Tel. číslo: <span class="text-success ">${
                      adminUserInfo.phoneNumber
                   }</span></li>
                   <li>
                      Heslo:
                      <input
                         type="password"
                         class="text-white"
                         style="background: rgba(0, 0, 0, 0.5)"
                         value="${adminUserInfo.password}"
                         disabled
                      />
                   </li>
                </ul>
                ${showEditProfileModal(adminUserInfo)}
             </div>
          </div>
       </div>
    </div>
    </div>
    `;
}
