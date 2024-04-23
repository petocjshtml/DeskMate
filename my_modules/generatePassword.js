const crypto = require("crypto");
function generatePassword(length = 8) {
   if (length < 8) {
      length = 8;
   }
   return crypto.randomBytes(length).toString("base64").slice(0, length);
}

module.exports = generatePassword;
