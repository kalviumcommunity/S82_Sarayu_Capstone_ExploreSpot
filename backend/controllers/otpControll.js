const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "saisarayu21@gmail.com",
      pass: "vuaz pakz vaim gomi"
    }
  });
  