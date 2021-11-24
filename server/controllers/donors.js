var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/database");
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

// router.get("/adddonor", function (req, res) {
//   res.render("donor/addDonor.ejs");
// });

// router.post("/adddonor", function (req, res) {
//   var name = req.body.name;
//   var email = req.body.email;
//   var contact = req.body.contact;
//   var join_date = req.body.date;
//   var role = req.body.role;
//   var salary = req.body.salary;

//   db.add_employee(
//     name,
//     email,
//     contact,
//     join_date,
//     role,
//     salary,
//     function (err, result) {
//       console.log("Donor inserted!!");
//       res.redirect("/donors");
//     }
//   );
// });

router.get("/editdonor/:id", function (req, res) {
  const id = req.params.id;
  db.getDonorbyId(id, function (err, result) {
    console.log(result);
    res.render("donor/editDonor.ejs", { list: result });
  });
});

router.post("/editdonor/:id", function (req, res) {
  var id = req.params.id;
  db.editDonor(
    id,
    req.body.username,
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
  var id = req.params.id;
  db.getDonorbyId(id, function (err, result) {
    res.render("donor/deleteDonor.ejs", { list: result });
  });
});

router.post("/deletedonor/:id", function (req, res) {
  var id = req.params.id;

  db.deleteDonor(id, function (err, result) {
    res.redirect("/donors");
  });
});

router.post("/search", function (req, res) {
  var key = req.body.search;
  db.searchUser(key, function (err, result) {
    console.log(result);

    res.render("donor/donors.ejs", { list: result });
  });
});
