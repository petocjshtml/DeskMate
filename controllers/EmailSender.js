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
         secure: false, // Use `true` for port 465, `false` for all other ports
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
}

module.exports = EmailSender;
