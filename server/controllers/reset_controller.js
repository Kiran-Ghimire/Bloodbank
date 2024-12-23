const express = require("express");

const router = express.Router();

const nodemailer = require("nodemailer");

const randomToken = require("random-token");
const db = require.main.require("./models/database");
const { check, validationResult } = require("express-validator");

router.get("/", function (req, res) {
  res.render("auth/resetpassword.ejs");
});

router.post(
  "/",
  [check("email").notEmpty().isEmail().withMessage("Valid Email required")],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const email = req.body.email;
    db.findOneAdmin(email, function (err, result1) {
      if (!result1) {
        console.log("Mail does not exist");
        res.redirect("back");
      }
      const id = result1[0].id;
      const email = result1[0].email;
      const token = randomToken(8);
      db.findTempAdmin(id, (err, result) => {
        console.log("result", result);
        if (result) {
          db.updateTempAdmin(id, token);
        }
      });
      db.tempAdmin(id, email, token, function (err, result2) {
        const output =
          `
            <p>Dear User, </p>
            <p>Your are receiving this email because you had requested to reset your password.</p>
            <p>Your new password has been generated. Please login using the given new password.</p>
            <ul>
                <li>User ID: ` +
          id +
          `</li>
                <li>Token: ` +
          token +
          `</li>
            </ul>
            <p>Login Link: <a href="http://localhost:3001/login">LOGIN</a></p>
            <p>You may change your password after you login under the section - ACCOUNT SETTINGS</p>
            <p><strong>This is an automatically generated mail. Please do not reply back.</strong></p>
            
            <p>Regards,</p>
            <p>H Manager</p>
        `;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "n4scent9@gmail.com",
            pass: "kuZ@1234",
          },
        });

        const mailOptions = {
          from: "n4scent9@gmail.com", // sender address
          to: email, // list of receivers
          subject: "Password Reset", // Subject line
          html: output, // plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            return console.log(err);
          }
          console.log(info);
        });
      });
    });

    res.send("A Token has been sent to your account");
  }
);

module.exports = router;
