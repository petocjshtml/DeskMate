const originalne_hodnoty = {};

const tablesData = [
   {
      id: 1,
      nazov: "Stôl A",
      pocet_ludi: 4,
      vybavenia: ["Premietačka", "Kávovar"],
      rezervacie: [
         {
            den: "12.04.2024",
            udalosti: [
               {
                  cas: "12:05 - 13:01",
                  osoba: "Gusto Trnka",
               },
               {
                  cas: "16:05 - 17:01",
                  osoba: "Alojz Tichý",
               },
            ],
         },
         {
            den: "13.04.2024",
            udalosti: [
               {
                  cas: "12:05 - 13:01",
                  osoba: "Martina Mrkvová",
               },
            ],
         },
      ],
   },
   {
      id: 2,
      nazov: "Stôl B",
      pocet_ludi: 6,
      vybavenia: ["Premietačka"],
      rezervacie: [
         {
            den: "12.04.2024",
            udalosti: [
               {
                  cas: "10:00 - 11:00",
                  osoba: "Petra Krajčová",
               },
            ],
         },
         {
            den: "13.04.2024",
            udalosti: [
               {
                  cas: "14:00 - 15:00",
                  osoba: "Emil Horváth",
               },
            ],
         },
      ],
   },
   {
      id: 3,
      nazov: "Stôl C",
      pocet_ludi: 8,
      vybavenia: ["Kávovar", "Chladnička"],
      rezervacie: [
         {
            den: "12.04.2024",
            udalosti: [
               {
                  cas: "09:00 - 10:00",
                  osoba: "Ján Novák",
               },
            ],
         },
         {
            den: "13.04.2024",
            udalosti: [
               {
                  cas: "16:00 - 17:00",
                  osoba: "Eva Biela",
               },
            ],
         },
      ],
   },
   {
      id: 4,
      nazov: "Stôl D",
      pocet_ludi: 3,
      vybavenia: ["Premietačka", "Kávovar", "Biela tabuľa"],
      rezervacie: [
         {
            den: "12.04.2024",
            udalosti: [
               {
                  cas: "08:00 - 09:00",
                  osoba: "Lukáš Malý",
               },
            ],
         },
         {
            den: "13.04.2024",
            udalosti: [
               {
                  cas: "17:00 - 18:00",
                  osoba: "Zuzana Vysoká",
               },
            ],
         },
      ],
   },
];

function EditCard(editButton) {
   const content_editable_1 = editButton.closest(".ce1"); //karta
   const content_editable_2 = content_editable_1.querySelector(".ce2"); //nadpis stolu
   const content_editable_3 = content_editable_1.querySelector(".ce3"); //počet ľudí
   const content_editable_4 = content_editable_1.querySelector(".ce4"); //vybavenia
   const content_editable_5 = content_editable_1.querySelector(".ce5"); //formular editacie vyb
   const content_editable_6 = content_editable_1.querySelector(".ce6"); //rezervacie
   const content_editable_7 = content_editable_1.querySelector(".ce7"); //button upraviť
   const content_editable_8 = content_editable_1.querySelector(".ce8"); //button vymazať

   //uloženie hodnôt
   originalne_hodnoty.nazov_stolu = content_editable_2.innerText;
   originalne_hodnoty.pocet_ludi = content_editable_3.innerText;
   originalne_hodnoty.pole_vybaveni = [];
   var vybavenia_elements = content_editable_4.querySelectorAll("h5");
   var vybavenia = Array.from(vybavenia_elements).map((h5_element) => {
      return h5_element.innerText;
   });
   originalne_hodnoty.pole_vybaveni = [...vybavenia];

   if (content_editable_7.innerText === "Upraviť") {
      zapniEditacnyMod();
   } else {
      if (overCiSuZadaneUdaje(content_editable_2.innerText, content_editable_3.innerText)) {
         zapniNormalnyMod();
      }
   }

   function zapniNormalnyMod() {
      content_editable_8.removeEventListener("click", obnovUdaje);
      content_editable_7.innerText = "Upraviť";
      content_editable_8.innerText = "Vymazať";
      content_editable_2.setAttribute("contenteditable", "false");
      content_editable_3.setAttribute("contenteditable", "false");
      content_editable_5.style.display = "none";
      content_editable_6.style.display = "block";
      upravStol(content_editable_1);
   }

   function zapniEditacnyMod() {
      content_editable_7.innerText = "Uložiť";
      content_editable_8.innerText = "Obnoviť";
      content_editable_8.addEventListener("click", obnovUdaje);
      content_editable_2.setAttribute("contenteditable", "true");
      content_editable_3.setAttribute("contenteditable", "true");
      content_editable_5.style.display = "flex";
      content_editable_6.style.display = "none";
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
      content_editable_2.innerText = originalne_hodnoty.nazov_stolu;
      content_editable_3.innerText = originalne_hodnoty.pocet_ludi;
      content_editable_4.innerHTML = "";
      if (originalne_hodnoty.pole_vybaveni.length !== 0) {
         originalne_hodnoty.pole_vybaveni.forEach((nazov_vybavenia) => {
            content_editable_4.innerHTML += `<li><h5 class="text-success">${nazov_vybavenia}</h5></li>`;
         });
      }
   }
}

function pridajVybavenieEditMode(edit_button_element) {
   const karta = edit_button_element.closest(".desk-mate-karta");
   var nove_vybavenie = karta.querySelector(".input_vybavenie_edit").value;
   var zoznam_vybaveni = karta.querySelector(".ce4");
   if (nove_vybavenie.length !== 0) {
      zoznam_vybaveni.innerHTML += `<li><h5 class="text-success">${nove_vybavenie}</h5></li>`;
      karta.querySelector(".input_vybavenie_edit").value = "";
   }
}

function upravStol(karta) {
   const id = karta.getAttribute("stol-mongo-id");
   const nadpis_stolu = karta.querySelector(".ce2").innerText;
   const pocet_ludi = karta.querySelector(".ce3").innerText;
   const zoznam_vybaveni = karta.querySelector(".ce4");
   const zoznam_vybaveni_h5 = zoznam_vybaveni.querySelectorAll("h5");
   var vybavenia = Array.from(zoznam_vybaveni_h5).map((nadpis) => nadpis.innerText);
   alert(id);
   alert(nadpis_stolu);
   alert(pocet_ludi);
   alert(vybavenia);
}

function vymazVybavenieEditMode(delete_button_element) {
   const karta = delete_button_element.closest(".desk-mate-karta");
   var zoznam_vybaveni = karta.querySelector(".ce4");
   var li_polozky = zoznam_vybaveni.querySelectorAll("li");
   if (li_polozky.length !== 0) {
      li_polozky[li_polozky.length - 1].remove();
   }
}

function vymazStol(delete_btn) {
   /* overenie či nieje v editovatelnom mode */
   if (delete_btn.innerText === "Vymazať") {
      /* logika pre backend */
      let karta = delete_btn.closest(".desk-mate-karta");
      alert(karta.getAttribute("stol-mongo-id"));
   }
}

function overCiSuZadaneUdaje(udaj1, udaj2) {
   return udaj1.length === 0 || udaj2.length === 0 ? false : true;
}

function pridajVybavenie() {
   let vybavenie = document.getElementById("input_vybavenie").value;
   document.getElementById("input_vybavenie").value = "";
   if (vybavenie.length !== 0) {
      let parent = document.getElementById("vybavenia");
      parent.innerHTML += `
         <button type="button" class="btn btn-outline-success mr-3 pridane-vybavenie-btn" disabled>
            ${vybavenie}
         </button>
      `;
   }
}

function vymazVybavenie() {
   let elementy = document.getElementsByClassName("pridane-vybavenie-btn");
   if (elementy.length !== 0) {
      elementy[elementy.length - 1].remove();
   }
}

function pridajStol() {
   let nazov_stolu = document.getElementById("nazov_stolu").value;
   let pocet_ludi_stolu = document.getElementById("pocet_ludi_stolu").value;
   let vybavenia = document.getElementsByClassName("pridane-vybavenie-btn");
   if (!overCiSuZadaneUdaje(nazov_stolu, pocet_ludi_stolu)) {
      return false;
   }
   //volanie backendu
   alert(nazov_stolu);
   alert(pocet_ludi_stolu);
   for (const vybavenie of vybavenia) {
      alert(vybavenie.innerText);
   }
}

function nacitajStoly(tablesData) {
   let parent_element = document.getElementById("parent");
   tablesData.forEach((table) => {
      parent_element.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
      <div class="desk-mate-karta ce1" stol-mongo-id="${table.id}">
         <a href="#" style="text-decoration: none"
            ><h3 class="text-white ce2">${table.nazov}</h3>
         </a>
         <hr style="border: 2px solid #28a745" />
         <h5>Počet ľudí: <span class="text-success ce3">${table.pocet_ludi}</span></h5>
         <ul class="ce4">
             ${getVybaveniaHtml(table.vybavenia)}
         </ul>
         <form class="form-inline ce5" style="display: none">
            <div class="form-group mb-3 mr-3">
               <input
                  type="search"
                  class="form-control input_vybavenie_edit"
                  placeholder="Nové vybavenie"
                  style="width: 220px"
               />
            </div>
            <div class="form-group mb-3 mr-3">
               <button
                  type="button"
                  onclick="pridajVybavenieEditMode(this)"
                  class="btn btn-outline-danger"
               >
                  <i class="fas fa-plus"></i>
               </button>
            </div>
            <div class="form-group mb-3 mr-3">
               <button
                  type="button"
                  onclick="vymazVybavenieEditMode(this)"
                  class="btn btn-outline-danger"
               >
                  <i class="far fa-trash-alt"></i>
               </button>
            </div>
         </form>

         <hr style="border: 2px solid #28a745" />

         <div class="rezervacie ce6">
         ${getRezervacieHtml(table.rezervacie)}
         </div>

         <div class="btn-group" role="group" aria-label="Basic example">
            <button
               type="button"
               onclick="EditCard(this)"
               class="btn btn-outline-success ce7"
            >
               Upraviť
            </button>
            <button
               type="button"
               onclick="vymazStol(this)"
               class="btn btn-outline-danger ce8"
            >
               Vymazať
            </button>
         </div>
      </div>
      </div>
       `;
   });
}

function getVybaveniaHtml(vybavenia_arr) {
   let vybavenia_html = "";
   vybavenia_arr.forEach((item) => {
      vybavenia_html += `<li><h5 class="text-success">${item}</h5></li>`;
   });
   return vybavenia_html;
}

function getRezervacieHtml(rezervacie_arr) {
   let rezervacie_html = "";
   rezervacie_arr.forEach((item) => {
      rezervacie_html += `
      <h5>Deň: <span class="text-success">${item.den}</span></h5><ul>
      `;
      item.udalosti.forEach((udalost) => {
         rezervacie_html += `   
      <li><h5>${udalost.cas} <span class="text-success">(${udalost.osoba})</span></h5></li>
      `;
      });
      rezervacie_html += `
      </ul><hr style="border: 2px solid #28a745" />
      `;
   });
   return rezervacie_html;
}

nacitajStoly(tablesData);
