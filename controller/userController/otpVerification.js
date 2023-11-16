import nodemailer from "nodemailer";
const EMAIL_PASSWORD= process.env.EMAIL_PASSWORD



const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "petscuewebsite@gmail.com",
    pass: "dwnfxzbpkuldkwmv",
  },
});

export const otpSend = (email) => {
  const otpEmail = email;
  const otp = Math.floor(10000 + Math.random() * 900000).toString();

  const mailOption = {
    from: "petscuewebsite@gmail.com",
    to: otpEmail,
    subject: "petscue verification",
    text: otp + " : petscue otp verification ",
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.error("email sending error ", error);
    } else {
      console.log("email sent : ", info.response);
    }
  });
  return otp;
};
