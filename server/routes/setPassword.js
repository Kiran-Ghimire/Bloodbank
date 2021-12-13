const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/database");
const saltRounds = 10;

router.post("/usersetpassword", function (req, res) {
  const token = req.body.token;
  db.checktoken(token, function (err, result) {
    console.log(result);
    if (result.length > 0) {
      console.log(result);
      const newpassword = req.body.password;
      bcrypt.hash(newpassword, saltRounds, (err, hash) => {
        err && res.json({ message: "Error Occurred.", type: "error" });

        const id = result[0].id;
        db.setpassword(id, hash, function (err, result1) {
          console.log("result1", result1);
          if (err) {
            // console.log('token did not match');
            res.send("token did not match");
          } else {
            res.send("Password has been changed...Go to login page");
          }
        });
      });
    } else {
      res.send("Token didnt match!!!");
    }
  });
});

module.exports = router;
