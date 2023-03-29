const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendInvite = (message) => {
  let mailTransporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    auth: {
      user: "support@climedao.com",
      pass: "498tok2LSXf#:?gY",
    },
  });

  var source = fs.readFileSync(
    path.join(__dirname, "../templates/invite-template.hbs"),
    "utf8"
  );
  var template = Handlebars.compile(source);

  let mailDetails = {
    ...message,
    html: template(message.templateObj),
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
      next();
    }
  });
};

const sendForgotLink = (message, next) => {
  let mailTransporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    auth: {
      user: "slat@karan0805.me",
      pass: "karan0805@slat",
    },
  });

  var source = fs.readFileSync(
    path.join(__dirname, "../templates/forgot-template.hbs"),
    "utf8"
  );
  var template = Handlebars.compile(source);

  let mailDetails = {
    ...message,
    html: template(message.templateObj),
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err);
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
      next();
    }
  });
};

module.exports = {
  sendInvite,
  sendForgotLink,
};
