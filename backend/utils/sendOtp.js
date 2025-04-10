const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const sendOtp = async (email) => {
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
  return otp;
};

module.exports = sendOtp;
