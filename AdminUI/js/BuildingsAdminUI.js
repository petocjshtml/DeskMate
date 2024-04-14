const originalne_hodnoty = {};

const buildingsData = [
   {
      id: "507f1f77bcf86cd799439011",
      name: "Budova A",
      location: "Bratislava",
      rooms: [
         {
            name: "kuchyňa",
         },
         {
            name: "konferenčná miestnosť",
         },
         {
            name: "recepcia",
         },
      ],
   },
   {
      id: "507f1f77bcf86cd799439012",
      name: "Budova B",
      location: "Košice",
      rooms: [
         {
            name: "kuchyňa",
         },
         {
            name: "prednášková sála",
         },
         {
            name: "laboratórium",
         },
      ],
   },
   {
      id: "507f1f77bcf86cd799439013",
      name: "Budova C",
      location: "Žilina",
      rooms: [
         {
            name: "kuchyňa",
         },
         {
            name: "posilňovňa",
         },
         {
            name: "archív",
         },
      ],
   },
   {
      id: "507f1f77bcf86cd79943901b",
      name: "Budova A",
      location: "Bratislava",
      rooms: [
         {
            name: "kuchyňa",
         },
         {
            name: "konferenčná miestnosť",
         },
         {
            name: "recepcia",
         },
      ],
   },
   {
      id: "507f1f77bcf86cd79943901a",
      name: "Budova B",
      location: "Košice",
      rooms: [
         {
            name: "kuchyňa",
         },
         {
            name: "prednášková sála",
         },
         {
            name: "laboratórium",
         },
      ],
   },
   {
      id: "507f1f77bcf86cd79943901e",
      name: "Budova C",
      location: "Žilina",
      rooms: [
         {
            name: "kuchyňa",
         },
         {
            name: "posilňovňa",
         },
         {
            name: "archív",
         },
      ],
   },
];

function EditCard(editButton) {
   const content_editable_1 = editButton.closest(".ce1"); //karta
   const content_editable_2 = content_editable_1.querySelector(".ce2"); //nadpis karty
   const content_editable_3 = content_editable_1.querySelector(".ce3"); //lokalita karty
   const content_editable_4 = content_editable_1.querySelector(".ce4"); //miestnosti karty (na schovanie)
   const content_editable_5 = content_editable_1.querySelector(".ce5"); //Upraviť Button karty
   const content_editable_6 = content_editable_1.querySelector(".ce6"); //Vymazať button karty
   let nadpis = content_editable_2.innerText;
   let lokalita = content_editable_3.innerText;
   originalne_hodnoty.nadpis = nadpis;
   originalne_hodnoty.lokalita = lokalita;

   if (content_editable_5.innerText === "Upraviť") {
      zapniEditacnyMod();
   } else {
      if (overCiSuZadaneUdaje(nadpis, lokalita)) {
         zapniNormalnyMod();
         upravBudovu(content_editable_1);
      }
   }

   function zapniNormalnyMod() {
      content_editable_6.removeEventListener("click", obnovUdaje);
      content_editable_2.setAttribute("contenteditable", "false");
      content_editable_3.setAttribute("contenteditable", "false");
      content_editable_4.style.display = "block";
      content_editable_5.innerText = "Upraviť";
      content_editable_6.innerText = "Vymazať";
   }

   function zapniEditacnyMod() {
      content_editable_6.addEventListener("click", obnovUdaje);
      content_editable_2.setAttribute("contenteditable", "true");
      content_editable_3.setAttribute("contenteditable", "true");
      content_editable_5.innerText = "Uložiť";
      content_editable_6.innerText = "Obnoviť";
      content_editable_4.style.display = "none";
      vyberEditovatelnyObsah(content_editable_2);
   }

   function vyberEditovatelnyObsah(element) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
   }

   function obnovUdaje() {
      content_editable_2.innerText = originalne_hodnoty.nadpis;
      content_editable_3.innerText = originalne_hodnoty.lokalita;
   }
}

function overCiSuZadaneUdaje(udaj1, udaj2) {
   return udaj1.length === 0 || udaj2.length === 0 ? false : true;
}

function pridajBudovu() {
   const nazov_budovy = document.getElementById("pridaj_nazov_budovy").value;
   const lokacia_budovy = document.getElementById("pridaj_lokalitu_budovy").value;
   if (overCiSuZadaneUdaje(nazov_budovy, lokacia_budovy)) {
      alert("Pridanie novej miestnosti s nazvom: " + nazov_budovy);
      alert("a lokaciou: " + lokacia_budovy);
   }
}

function upravBudovu(karta) {
   const id_karty = karta.getAttribute("budova-mongo-id");
   const nadpis = karta.querySelector(".ce2").innerText;
   const lokacia = karta.querySelector(".ce3").innerText;
   /* volanie backendu */
   alert("Id budovy na úpravu je: " + id_karty);
   alert("Nový nadpis budovy je: " + nadpis);
   alert("Nová lokácia budovy je: " + lokacia);
}

function vymazBudovu(delete_btn) {
   if (delete_btn.innerText === "Vymazať") {
      /* logika pre backend */
      let karta = delete_btn.closest(".desk-mate-karta");
      alert(karta.getAttribute("budova-mongo-id"));
   }
}

function getBuildingRoomsHTML(rooms_array) {
   let html = "";
   rooms_array.forEach((room) => {
      html += `<li><h5 class="text-success">${room.name}</h5></li>`;
   });
   return html;
}

function nacitajBudovy(buildingsData) {
   let parent_element = document.getElementById("parent");
   buildingsData.forEach((building) => {
      parent_element.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
         <div class="desk-mate-karta ce1" budova-mongo-id="${building.id}">
            <a href="#" style="text-decoration: none"
               ><h3 class="text-white ce2">${building.name}</h3>
            </a>
            <hr style="border: 2px solid #28a745" />
            <h5 class="ce3">${building.location}</h5>
            <hr style="border: 2px solid #28a745" />
            <ul class="ce4">
               ${getBuildingRoomsHTML(building.rooms)}
            </ul>
            <div class="btn-group" role="group" aria-label="Basic example">
               <button
                  type="button"
                  onclick="EditCard(this)"
                  class="btn btn-outline-success ce5"
               >
                  Upraviť
               </button>
               <button
                  type="button"
                  onclick="vymazBudovu(this)"
                  class="btn btn-outline-danger ce6"
               >
                  Vymazať
               </button>
            </div>
         </div>
      </div>
      `;
   });
}

nacitajBudovy(buildingsData);
