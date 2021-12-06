const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/database");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const randomToken = require("random-token");
const { check, validationResult } = require("express-validator");

// router.use(bodyParser.urlencoded({extended : true}));
// router.use(express.json());

router.get("/", function (req, res) {
  res.render("auth/signup.ejs");
});

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
    check("email").notEmpty().isEmail().withMessage("Valid Email required"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const email_status = "not_verified";
    const email = req.body.email;
    const username = req.body.username;

    db.signupAdmin(
      req.body.username,
      req.body.email,
      req.body.password,
      email_status
    );
    const token = randomToken(8);
    db.findUserVerifyAdmin(id, (err, result) => {
      console.log("result", result);
      if (result) {
        db.updateVerifyAdmin(id, token);
      }
    });

    db.verifyAdmin(req.body.username, email, token);

    db.getuseridAdmin(email, function (err, result) {
      console.log(result);
      const id = result[0].id;
      const output =
        `
            <p>Dear  ` +
        username +
        `, </p>
            <p>Thanks for sign up. Your verification id and token is given below :  </p>
           
            <ul>
                <li>User ID: ` +
        id +
        `</li>
                <li>Token: ` +
        token +
        `</li>
            </ul>
            <p>verify Link: <a href="http://localhost:3001/verify">Verify</a></p>
            
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
        from: "n4scent9@gmail.com",
        to: email,
        subject: "Email Verification", // Subject line
        html: output, // plain text body
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return console.log(err);
        }
        console.log(info);
      });

      // res.send ('Check you email for token to verify');
    });

    res.redirect("verify");
  }
);

module.exports = router;
