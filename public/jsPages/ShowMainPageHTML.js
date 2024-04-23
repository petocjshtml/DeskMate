function ShowMainPageHTML() {
   document.getElementById("render").innerHTML = `
    <div class="welcome-section">
            <div class="container">
               <div class="row">
                  <div class="col-md-6">
                     <div class="welcome-text">
                        <h2 class="text-success">DeskMate</h2>
                        <p>
                           An innovative job booking app that offers the flexibility to choose
                           workspace anywhere, anytime, facilitating both advance planning and
                           spontaneous decisions, opening the door to a variety of work environments
                           for your every working day. Feel free to try the app right now!!!
                        </p>
                     </div>
                  </div>
                  <div class="col-md-6">
                     <div class="form-container">
                        <h2 class="text-success">Login</h2>
                        <form>
                           <div class="form-group">
                              <label for="email">Email address</label>
                              <input
                                 type="email"
                                 class="form-control"
                                 id="login_email"
                                 placeholder="Enter email"
                              />
                           </div>
                           <div class="form-group">
                              <label for="password">Password</label>
                              <input
                                 type="password"
                                 class="form-control"
                                 id="login_password"
                                 placeholder="Password"
                              />
                           </div>
                           <button type="submit" class="btn btn-success" onclick="event.preventDefault(); LoginUser();">Log In</button>
                           <div class="mt-3">
                              <a href="#" class="text-success" onclick="event.preventDefault(); ShowAccountRequestHTML();"
                                 >Request an account</a
                              >
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
    `;
}

function LoginUser() {
   const email = document.getElementById("login_email").value;
   const password = document.getElementById("login_password").value;
   console.log(email, password);
}
