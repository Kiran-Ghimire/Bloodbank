const express = require("express");

const mysql = require("mysql");
const session = require("express-session");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");
const sweetalert = require("sweetalert2");
const { check, validationResult } = require("express-validator");

// router.get('/', function(req ,res){

//     res.render('auth/login.ejs');
// });

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

// router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

router.post(
  "/userlogin",
  [
    check("username").notEmpty().withMessage("Username is reequired"),
    check("password").notEmpty().withMessage("Password is reequired"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
      con.query(
        "select * from user where username = ? and password = ?",
        [username, password],
        function (error, results, fields) {
          if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.cookie("username", username);
            const status = results[0].emailstatus;
            if (status === "not_verified") {
              res.send("please verify your email");
            } else {
              sweetalert.fire("logged In!");
              res.status(200).json(results);
            }
          } else {
            res.send("Incorrect username / password");
          }
          res.end();
        }
      );
    } else {
      res.send("please enter user name and password");
      res.end();
    }
  }
);

module.exports = router;
