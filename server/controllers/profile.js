const express = require("express");
const router = express.Router();
const db = require.main.require("./models/database");
const bodyPaser = require("body-parser");

router.get("*", function (req, res, next) {
  if (req.cookies["username"] == null) {
    res.redirect("/login");
  } else {
    next();
  }
});

router.get("/profile", function (req, res) {
  const username = req.cookies["username"];
  db.getuserdetails(username, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.render("auth/profile.ejs", { list: result });
  });
});

router.post("/profile", function (req, res) {
  const username = req.cookies["username"];
  db.getuserdetails(username, function (err, result) {
    console.log(result[0]);
    const id = result[0].id;
    const password = result[0].password;
    const username = result[0].username;
    if (password == req.body.password) {
      db.editProfile(
        id,
        req.body.username,
        req.body.email,
        req.body.new_password,
        function (err, result1) {
          if (result1) {
            // res.send("profile edited successfully");
            res.redirect("/login");
          }
          if (!result1) {
            res.send("old password did not match");
          }
        }
      );
    }
  });
});

module.exports = router;
