/*  frontend funkcie */
const originalne_hodnoty = {};

function EditCard(editButton) {
   const content_editable_1 = editButton.closest(".ce1"); //karta
   const content_editable_2 = content_editable_1.querySelector(".ce2"); //nadpis karty
   const content_editable_3 = content_editable_1.querySelector(".ce3"); //lokalita karty
   const content_editable_4 = content_editable_1.querySelector(".ce4"); //stoly karty (na schovanie)
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
         upravMiestnost(content_editable_1);
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

/*  backend funkcie */
function pridajMiestnost() {
   const nazov_miestnosti = document.getElementById("pridaj_nazov_miestnosti").value;
   const lokacia_miestnosti = document.getElementById("pridaj_lokaciu_miestnosti").value;
   if (overCiSuZadaneUdaje(nazov_miestnosti, lokacia_miestnosti)) {
      alert("Pridanie novej miestnosti s nazvom: " + nazov_miestnosti);
      alert("a lokaciou: " + lokacia_miestnosti);
   }
}

function upravMiestnost(karta) {
   const id_karty = karta.getAttribute("miestnost-mongo-id");
   const nadpis = karta.querySelector(".ce2").innerText;
   const lokacia = karta.querySelector(".ce3").innerText;
   /* volanie backendu */
   alert("Id miestnosti na úpravu je: " + id_karty);
   alert("Nový nadpis miestnosti je: " + nadpis);
   alert("Nová lokácia miestnosti je: " + lokacia);
}

function vymazMiestnost(karta) {
   let parent_element = karta.closest(".desk-mate-karta");
   alert(parent_element.getAttribute("miestnost-mongo-id"));
}

const roomsData = [
   {
      id: "507f1f77bcf86cd799439011",
      name: "Conference Room A",
      location: "First floor, near the lobby",
      tables: [{ name: "Table 1" }, { name: "Table 2" }],
   },
   {
      id: "507f1f77bcf86cd799439012",
      name: "Meeting Room B",
      location: "Second floor, next to the elevator",
      tables: [{ name: "Table 3" }, { name: "Table 4" }],
   },
   {
      id: "507f1f77bcf86cd799439013",
      name: "Board Room",
      location: "Third floor, corner office",
      tables: [{ name: "Table 5" }, { name: "Table 6" }],
   },
   {
      id: "507f1f77bcf86cd799439014",
      name: "Strategy Room",
      location: "Fourth floor, window side",
      tables: [{ name: "Table 7" }, { name: "Table 8" }],
   },
   {
      id: "507f1f77bcf86cd799439015",
      name: "Project Room C",
      location: "Ground floor, near the cafeteria",
      tables: [{ name: "Table 9" }, { name: "Table 10" }],
   },
];

function nacitajMiestnosti(roomsData) {
   let parent_element = document.getElementById("parent");
   roomsData.forEach((room) => {
      parent_element.innerHTML += `
         <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
         <div class="desk-mate-karta ce1" miestnost-mongo-id="${room.id}">
         <a href="#" style="text-decoration: none"
            ><h3 id="autoselect" class="text-white ce2">${room.name}</h3></a
         >
         <hr style="border: 2px solid rgb(40, 167, 69)" />
         <h5 class="ce3">${room.location}</h5>
         <hr style="border: 2px solid rgb(40, 167, 69)" />
         <ul class="ce4">
         ${getRoomTablesHTML(room.tables)}
            </ul>
            <div class="btn-group" role="group" aria-label="Basic example">
               <button type="button" onclick="EditCard(this)" class="btn btn-outline-success ce5">Upraviť</button
               ><button type="button" onclick="vymazMiestnost(this)" class="btn btn-outline-danger ce6">Vymazať</button>
            </div>
         </div>
         </div>
       `;
   });
}

function getRoomTablesHTML(tables_array) {
   let html = "";
   tables_array.forEach((table) => {
      html += `<li><h5 class="text-success">${table.name}</h5></li>`;
   });
   return html;
}

nacitajMiestnosti(roomsData);
