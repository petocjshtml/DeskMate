/*  frontend funkcie */
function EditCard(editButton) {
   const content_editable_1 = editButton.closest(".ce1"); //karta
   const content_editable_2 = content_editable_1.querySelector(".ce2"); //meno admina
   const content_editable_3 = content_editable_1.querySelector(".ce3"); //email admina
   const content_editable_4 = content_editable_1.querySelector(".ce4"); //tel. čislo admina
   const content_editable_5 = content_editable_1.querySelector(".ce5"); //input s heslom
   const content_editable_6 = content_editable_1.querySelector(".ce6"); //Upraviť Button karty

   let meno = content_editable_2.innerText;
   let email = content_editable_3.innerText;
   let tel_cislo = content_editable_4.innerText;
   let admin_heslo = content_editable_5.value;
   let button_text = content_editable_6.innerText;

   //logika prepnutia módov
   if (button_text === "Upraviť Profil") {
      zapniEditacnyMod();
   } else {
      if (overCiSuZadaneUdaje(meno, email, admin_heslo, tel_cislo)) {
         zapniNormalnyMod();
         editAdminData(
            content_editable_1.getAttribute("pouzivatel-mongo-id"),
            meno,
            email,
            admin_heslo,
            tel_cislo
         );
      }
   }

   function zapniNormalnyMod() {
      content_editable_2.setAttribute("contenteditable", "false");
      content_editable_3.setAttribute("contenteditable", "false");
      content_editable_4.setAttribute("contenteditable", "false");
      content_editable_5.disabled = true;
      content_editable_6.innerText = "Upraviť Profil";
   }

   function zapniEditacnyMod() {
      content_editable_2.setAttribute("contenteditable", "true");
      content_editable_3.setAttribute("contenteditable", "true");
      content_editable_4.setAttribute("contenteditable", "true");
      content_editable_5.disabled = false;
      content_editable_6.innerText = "Uložiť Zmeny";
      vyberEditovatelnyObsah(content_editable_2);
   }

   function vyberEditovatelnyObsah(element) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
   }
}

function overCiSuZadaneUdaje(udaj1, udaj2, udaj3, udaj4) {
   return udaj1.length === 0 || udaj2.length === 0 || udaj3.length === 0 || udaj4.length === 0
      ? false
      : true;
}

/*  backend funkcie */
function editAdminData(id, meno, email, admin_heslo, tel_cislo) {
   /*   alert(admin_heslo); */
}
