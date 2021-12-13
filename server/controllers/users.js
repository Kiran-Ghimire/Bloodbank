const express = require("express");
const router = express.Router();

const db = require.main.require("./models/database");

router.get("*", function (req, res, next) {
  if (req.cookies["username"] == null) {
    res.redirect("/login");
  } else {
    next();
  }
});

router.get("/", function (req, res) {
  db.getAllUser(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.render("user/users.ejs", { list: result });
  });
});

router.get("/editUser/:id", function (req, res) {
  const id = req.params.id;

  db.getUser(id, function (err, result) {
    if (err) throw err;
    res.render("user/editUser.ejs", { list: result });
  });
});

router.post("/editUser/:id", function (req, res) {
  const id = req.params.id;
  db.editUser(
    id,
    req.body.username,
    req.body.email,
    req.body.dob,
    req.body.phone,
    req.body.gender,
    req.body.bloodtype,
    req.body.address,

    req.body.emailstatus,

    function (err, result) {
      if (err) throw err;

      //res.render('edit_doctor.ejs',{list:result});
      res.redirect("/users");
    }
  );
});

router.get("/deleteUser/:id", function (req, res) {
  const id = req.params.id;
  db.getUser(id, function (err, result) {
    if (err) throw err;
    res.render("user/deleteUser.ejs", { list: result });
  });
});

router.post("/deleteUser/:id", function (req, res) {
  const id = req.params.id;
  db.deleteUser(id, function (err, result) {
    if (err) throw err;
    res.redirect("/users");
  });
});

router.get("/", function (req, res) {
  db.getAllUser(function (err, result) {
    if (err) throw err;
    res.render("users.ejs", { list: result });
  });
});

router.post("/search", function (req, res) {
  const key = req.body.search;
  db.searchUser(key, function (err, result) {
    console.log(result);

    res.render("user/users.ejs", { list: result });
  });
});

module.exports = router;
