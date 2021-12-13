const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require.main.require("./models/database");

router.post(
  "/userlogin",

  function (req, res) {
    const { email, password } = req.body;

    db.loginUser(email, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      console.log(result);
      if (result.length > 0) {
        const emailstatus = result[0].emailstatus;
        if (emailstatus === "not_verified") {
          res.send({ type: "warning", message: "User not verified" });
        } else {
          bcrypt.compare(password, result[0].password, (error, response) => {
            console.log("p1", password);
            console.log("p2", result[0].password);

            console.log("response", response);

            if (response) {
              req.session = email;

              const id = result[0].userid;
              const token = jwt.sign({ id }, "jwtSecret", {
                expiresIn: 300,
              });

              res.json({ auth: true, token: token, result: result });
            } else {
              res.json({
                auth: false,
                message: "Wrong email/password combination!",
              });
            }
          });
        }
        // });
      } else {
        res.json({ auth: false, message: "no user exists" });
      }
    });
  }
);

module.exports = router;
