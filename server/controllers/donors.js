const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/database");
const { check, validationResult } = require("express-validator");

module.exports = router;

router.get("*", function (req, res, next) {
  if (req.cookies["username"] == null) {
    res.redirect("/login");
  } else {
    next();
  }
});

router.get("/", function (req, res) {
  db.getAllDonor(function (err, result) {
    res.render("donor/donors.ejs", { list: result });
  });
});

router.get("/adddonor", function (req, res) {
  res.render("donor/addDonor.ejs");
});

router.post("/adddonor", function (req, res) {
  const donorname = req.body.donorname;
  const email = req.body.email;
  const dob = req.body.dob;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const bloodtype = req.body.bloodtype;
  const address = req.body.address;

  db.addDonor(
    donorname,
    email,
    dob,
    phone,
    gender,
    bloodtype,
    address,
    function (err, result) {
      if (err) throw err;
      console.log("Donor inserted!!");
      // console.log("resulttttttttttttt", result);
      res.redirect("/donors");
    }
  );
});

router.get("/editdonor/:id", function (req, res) {
  const id = req.params.id;
  db.getDonorbyId(id, function (err, result) {
    console.log(result);
    res.render("donor/editDonor.ejs", { list: result });
  });
});

router.post("/editdonor/:id", function (req, res) {
  const id = req.params.id;
  db.editDonor(
    id,
    req.body.donorname,
    req.body.email,
    req.body.dob,
    req.body.phone,
    req.body.gender,
    req.body.bloodtype,
    req.body.address,
    function (err, result) {
      if (err) throw err;

      res.redirect("/donors");
    }
  );
});

router.get("/deletedonor/:id", function (req, res) {
  const id = req.params.id;
  db.getDonorbyId(id, function (err, result) {
    res.render("donor/deleteDonor.ejs", { list: result });
  });
});

router.post("/deletedonor/:id", function (req, res) {
  const id = req.params.id;

  db.deleteDonor(id, function (err, result) {
    res.redirect("/donors");
  });
});

router.post("/search", function (req, res) {
  const key = req.body.search;
  db.searchDonor(key, function (err, result) {
    console.log(result);

    res.render("donor/donors.ejs", { list: result });
  });
});
