const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secureConnection: false,
  auth: {
    user: "firbolg@live.fr",
    pass: "AC08jg17#ST!22",
  },
  tls: {
    ciphers: "SSLv3",
  },
});

async function main(email) {
  const info = await transporter.sendMail({
    from: email.nom + " " + email.email+ "<firbolg@live.fr>", 
    to: "firbolg@live.fr", 
    subject: email.sujet, 
    text: email.message, 
    
  });

  console.log("Message sent: %s", info.messageId);

}

module.exports = { main };
