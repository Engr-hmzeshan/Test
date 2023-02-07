const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
module.exports = function (name, email, password) {
  // Set up the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  // Set up the handlebars options
  const handlebarsOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: "templates/",
      layoutsDir: "templates/",
      defaultLayout: "template.hbs",
    },
    viewPath: "templates/",
    extName: ".hbs",
  };

  // Attach the handlebars engine to the transporter
  transporter.use("compile", hbs(handlebarsOptions));

  const mailOptions = {
    from: `${process.env.NAME} <${process.env.USER_EMAIL}>`,
    to: email,
    subject: "Successful Login and Password Information - Test",
    template: "template",
    context: {
      name,
      password,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
