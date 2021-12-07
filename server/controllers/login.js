const express = require("express");
const home = require("./profile");
const mysql = require("mysql");
const session = require("express-session");
const router = express.Router();
const bodyParser = require("body-parser");
// const db = require.main.require("./models/db_controller");
const sweetalert = require("sweetalert2");
const { check, validationResult } = require("express-validator");

router.get("/", function (req, res) {
  res.render("auth/login.ejs");
});

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bloodbank",
});

router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  function (request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    const username = request.body.username;
    const password = request.body.password;

    if (username && password) {
      con.query(
        "select * from adminuser where username = ? and password = ?",
        [username, password],
        function (error, results, fields) {
          if (results.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.cookie("username", username);
            const status = results[0].email_status;
            if (status === "not_verified") {
              response.send("please verify your email");
            } else {
              sweetalert.fire("logged In!");
              response.redirect("/");
            }
          } else {
            response.send("Incorrect username / password");
          }
          response.end();
        }
      );
    } else {
      response.send("please enter user name and password");
      response.end();
    }
  }
);

module.exports = router;
