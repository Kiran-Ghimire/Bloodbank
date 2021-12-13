const express = require("express");

const router = express.Router();

const db = require.main.require("./models/database");
const { check, validationResult } = require("express-validator");

module.exports = router;

router.get("/", function (req, res) {
  res.render("auth/setpassword.ejs");
});

router.post(
  "/",
  [
    check("id").notEmpty().withMessage("Id is required"),
    check("token").notEmpty().withMessage("Token is required"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const token = req.body.token;
    db.checktokenAdmin(token, function (err, result) {
      if (result.length > 0) {
        console.log(result);
        const newpassword = req.body.password;
        const id = result[0].id;
        db.setpasswordAdmin(id, newpassword, function (err, result1) {
          if (err) {
            // console.log('token did not match');
            res.send("token did not match");
          } else {
            res.send("Password has been changed...Go to login page");
          }
        });
      } else {
        res.send("Token didnt match!!!");
      }
    });
  }
);
