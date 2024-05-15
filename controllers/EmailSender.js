const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailSender {
   constructor() {
      this.config = {
         sender_email: process.env.SENDER_EMAIL,
         sender_app_password: process.env.SENDER_PASSWORD,
      };

      this.transporter = nodemailer.createTransport({
         service: "gmail",
         host: "smtp.gmail.com",
         port: 587,
         secure: false,
         auth: {
            user: this.config.sender_email,
            pass: this.config.sender_app_password,
         },
      });
   }

   async potvrdUcet(email_prijemcu, password) {
      const htmlContent = `<p>Vaše prihlasovacie údaje sú:<br> email: <b>${email_prijemcu}</b><br>heslo: <b>${password}</b> </p> `;
      var mail_setup = {
         from: {
            name: "Desk Mate",
            address: this.config.sender_email,
         },
         to: [email_prijemcu],
         subject: "Váš DeskMate Účet bol úspešne vytvorený!",
         text: "",
         html: htmlContent,
      };
      try {
         await this.transporter.sendMail(mail_setup);
         console.log("Email has been sent!");
      } catch (error) {
         console.error(error);
      }
   }

   async zamietniUcet(email_prijemcu) {
      const htmlContent = `<p>V prípade nejasnosti prosím kontaktuje podporu: <b>${this.config.sender_email}</b></p> `;
      var mail_setup = {
         from: {
            name: "Desk Mate",
            address: this.config.sender_email,
         },
         to: [email_prijemcu],
         subject: "Vaša žiadosť o účet v aplikácii DeskMate bola zamietnutá.",
         text: "",
         html: htmlContent,
      };
      try {
         await this.transporter.sendMail(mail_setup);
         console.log("Email has been sent!");
      } catch (error) {
         console.error(error);
      }
   }

   async notificateUserAboutReservationDestroy(deleted_reservation_info) {
      var htmlContent = `<h1>Vaša rezervácia s danými údajmi bola zrušená.</h1> `;
      htmlContent += `<h3>Rezervačné info</h3>`;
      htmlContent += `<ul>`;
      htmlContent += `<li>Názov budovy: ${deleted_reservation_info.buildingName}</li>`;
      htmlContent += `<li>Názov miestnosti: ${deleted_reservation_info.roomName}</li>`;
      htmlContent += `<li>Názov stolu: ${deleted_reservation_info.deskName}</li>`;
      htmlContent += `<li>Dátum rezervácie: ${deleted_reservation_info.date}</li>`;
      htmlContent += `<li>Čas rezervácie: ${deleted_reservation_info.timeFrom} - ${deleted_reservation_info.timeTo}</li>`;
      htmlContent += `<li>Meno admina, ktorý zrušil rezerváciu: ${deleted_reservation_info.adminName}</li>`;
      htmlContent += `<li>Kontakt na admina, ktorý zrušil rezerváciu: ${deleted_reservation_info.adminEmail}</li>`;
      htmlContent += `</ul>`;
      var mail_setup = {
         from: {
            name: "Desk Mate",
            address: this.config.sender_email,
         },
         to: [deleted_reservation_info.userEmail],
         subject: "Info o zrušení rezervácie!",
         text: "",
         html: htmlContent,
      };
      try {
         await this.transporter.sendMail(mail_setup);
         console.log("Email has been sent!");
      } catch (error) {
         console.error(error);
      }
   }
}

module.exports = EmailSender;
