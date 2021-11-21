const express = require("express");

const bodyParser = require("body-parser");
const db = require("../models/database");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const randomToken = require("random-token");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/blood",
  //   [
  //     check("username").notEmpty().withMessage("Username is required"),

  //     check("email").notEmpty().isEmail().withMessage("Valid Email required"),
  //     check("password").notEmpty().withMessage("Password is required"),
  //     check("dob").notEmpty().withMessage("Date of birth is required"),
  //     check("phone").notEmpty().withMessage("Phone is required"),
  //     check("gender").notEmpty().withMessage("Gender is required"),
  //     check("bloodtype").notEmpty().withMessage("Blood type is required"),
  //     check("address").notEmpty().withMessage("Address is required"),
  //   ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const role = "User";
    const emailstatus = "not_verified";
    const {
      username,
      email,
      password,
      dob,
      phone,
      gender,
      bloodtype,
      address,
    } = req.body;
    console.log(req.body);

    db.signup(
      username,
      email,
      password,
      dob,
      phone,
      gender,
      bloodtype,
      address,
      role,
      emailstatus
    );
    console.log("Signup DOneeeeeee!!");
    const token = randomToken(8);

    db.verify(req.body.username, email, token);

    db.getuserid(email, function (err, result) {
      console.log("Email", email);
      console.log("Result", result);
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

    // res.redirect("verifymail");
  }
);

module.exports = router;