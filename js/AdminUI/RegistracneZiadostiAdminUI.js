let reg_ziadosti = [
   {
      id: "evw3541",
      name: "Eva Nováková",
      email: "eva.novakova@example.com",
      phone: "+421 900 123 456",
   },
   {
      id: "evw3542",
      name: "Ján Horváth",
      email: "jan.horvath@example.com",
      phone: "+421 901 234 567",
   },
   {
      id: "evw3543",
      name: "Lucia Kováčová",
      email: "lucia.kovacova@example.com",
      phone: "+421 902 345 678",
   },
   {
      id: "evw3544",
      name: "Peter Šťastný",
      email: "peter.stastny@example.com",
      phone: "+421 903 456 789",
   },
   {
      id: "evw3545",
      name: "Martina Vršková",
      email: "martina.vrskova@example.com",
      phone: "+421 904 567 890",
   },
   {
      id: "evw3546",
      name: "Tomáš Horák",
      email: "tomas.horak@example.com",
      phone: "+421 905 678 901",
   },
   {
      id: "evw3547",
      name: "Simona Halásová",
      email: "simona.halasova@example.com",
      phone: "+421 906 789 012",
   },
   {
      id: "evw3548",
      name: "Lukáš Moravčík",
      email: "lukas.moravcik@example.com",
      phone: "+421 907 890 123",
   },
   {
      id: "evw3549",
      name: "Barbora Križanová",
      email: "barbora.krizanova@example.com",
      phone: "+421 908 901 234",
   },
];

function nacitajRegistracneZiadosti(reg_ziadosti) {
   let parent_element = document.getElementById("parent");
   reg_ziadosti.forEach((reg_ziadost, index) => {
      parent_element.innerHTML += `
       <div class="col-sm-12 col-md-6 mb-3">
          <div class="desk-mate-karta" reg-ziadost-mongo-id="${reg_ziadost.id}">
             <span style="font-size: 1.25rem">${reg_ziadost.name}</span>
             <hr style="border: 2px solid #28a745" />
             <ul>
                <li>Email: <span class="text-success">${reg_ziadost.email}</span></li>
                <li>Tel. číslo: <span class="text-success">${reg_ziadost.phone}</span></li>
             </ul>
             <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" onclick="potvrdZiadost(this)" class="btn btn-outline-success">Potvrdiť</button>
                <button type="button" onclick="zamietniZiadost(this)" class="btn btn-outline-danger">Zamietnúť</button>
             </div>
          </div>
       </div>
       `;
   });
}

function potvrdZiadost(button) {
   const parent_karta = button.closest(".desk-mate-karta");
   alert("potvrdit ziadost s id " + parent_karta.getAttribute("reg-ziadost-mongo-id"));
}

function zamietniZiadost(button) {
   const parent_karta = button.closest(".desk-mate-karta");
   alert("zamietnut ziadost s id " + parent_karta.getAttribute("reg-ziadost-mongo-id"));
}

nacitajRegistracneZiadosti(reg_ziadosti);
