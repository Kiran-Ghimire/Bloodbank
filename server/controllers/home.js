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

router.get("/", function (req, res) {
  db.getAllUser(function (err, result) {
    res.render("home.ejs", {
      userlist: result,
    });
  });
});

module.exports = router;
