const rezervacie = [
   {
      id_rezervacie: "mongo001",
      nazov_budovy: "Ringier hlavná budova",
      datum: "23. 2. 2023",
      cas_od_do: "12:30 - 13:00",
      nazov_miestnosti: "Zasadacka",
      stoly_miestnosti: [
         {
            nazov_stolu: "Stôl A",
            vybavenia_stolu: ["Premietačka", "Kávovar"],
         },
         {
            nazov_stolu: "Stôl B",
            vybavenia_stolu: ["Bez vybavenia"],
         },
      ],
      pocet_osob: 8,
   },
   {
      id_rezervacie: "mongo002",
      nazov_budovy: "Ringier hlavná budova",
      datum: "23. 2. 2023",
      cas_od_do: "12:30 - 13:00",
      nazov_miestnosti: "Zasadacka",
      stoly_miestnosti: [
         {
            nazov_stolu: "Stôl A",
            vybavenia_stolu: ["Premietačka", "Kávovar"],
         },
         {
            nazov_stolu: "Stôl B",
            vybavenia_stolu: ["Bez vybavenia"],
         },
      ],
      pocet_osob: 8,
   },
   {
      id_rezervacie: "mongo003",
      nazov_budovy: "Ringier hlavná budova",
      datum: "23. 2. 2023",
      cas_od_do: "12:30 - 13:00",
      nazov_miestnosti: "Zasadacka",
      stoly_miestnosti: [
         {
            nazov_stolu: "Stôl A",
            vybavenia_stolu: ["Premietačka", "Kávovar"],
         },
         {
            nazov_stolu: "Stôl B",
            vybavenia_stolu: ["Bez vybavenia"],
         },
      ],
      pocet_osob: 8,
   },
   {
      id_rezervacie: "mongo004",
      nazov_budovy: "Ringier hlavná budova",
      datum: "23. 2. 2023",
      cas_od_do: "12:30 - 13:00",
      nazov_miestnosti: "Zasadacka",
      stoly_miestnosti: [
         {
            nazov_stolu: "Stôl A",
            vybavenia_stolu: ["Premietačka", "Kávovar"],
         },
         {
            nazov_stolu: "Stôl B",
            vybavenia_stolu: ["Bez vybavenia"],
         },
      ],
      pocet_osob: 8,
   },
   {
      id_rezervacie: "mongo005",
      nazov_budovy: "Ringier hlavná budova",
      datum: "23. 2. 2023",
      cas_od_do: "12:30 - 13:00",
      nazov_miestnosti: "Zasadacka",
      stoly_miestnosti: [
         {
            nazov_stolu: "Stôl A",
            vybavenia_stolu: ["Premietačka", "Kávovar"],
         },
         {
            nazov_stolu: "Stôl B",
            vybavenia_stolu: ["Bez vybavenia"],
         },
      ],
      pocet_osob: 8,
   },
];

function vymazRezervaciu(delete_button) {
   let karta = delete_button.closest(".desk-mate-karta");
   alert(karta.getAttribute("rezervacia-mongo-id"));
}

function zobrazRezervacie(rezervacie) {
   let parent_element = document.getElementById("parent");
   rezervacie.forEach((rezervacia) => {
      parent_element.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
      <div class="desk-mate-karta" rezervacia-mongo-id="${rezervacia.id_rezervacie}">
         <h3>${rezervacia.nazov_budovy}</h3>
         <hr style="border: 2px solid rgb(40, 167, 69)" />
         <h5>${rezervacia.cas_od_do} (${rezervacia.datum})</h5>
         <hr style="border: 2px solid rgb(40, 167, 69)" />
         <h5>${rezervacia.nazov_miestnosti}</h5>
         ${getStolyHtmlObsah(rezervacia.stoly_miestnosti)}
         <h5>Počet osôb: <span class="text-success">${rezervacia.pocet_osob}</span></h5>
         <hr style="border: 2px solid rgb(40, 167, 69)" />
         <button type="button" onclick="vymazRezervaciu(this)" class="btn btn-outline-danger">Zrušiť rezerváciu</button>
      </div>
   </div>
      `;
   });
}

function getStolyHtmlObsah(stoly_arr) {
   let stoly_html = `<ul>`;
   stoly_arr.forEach((stol) => {
      stoly_html += `<li>${stol.nazov_stolu}${getVybaveniaStoluHtmlObsah(
         stol.vybavenia_stolu
      )}</li>`;
   });
   stoly_html += `</ul>`;
   return stoly_html;
}

function getVybaveniaStoluHtmlObsah(vybavenia_arr) {
   let vybavenia_html = `<ul>`;
   vybavenia_arr.forEach((vybavenie) => {
      vybavenia_html += `<li>${vybavenie}</li>`;
   });
   vybavenia_html += `</ul>`;
   return vybavenia_html;
}

zobrazRezervacie(rezervacie);
