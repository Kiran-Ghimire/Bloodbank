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

// router.get("/adddonor", function (req, res) {
//   res.render("donor/addDonor.ejs");
// });

// router.post("/adddonor", function (req, res) {
//   const name = req.body.name;
//   const email = req.body.email;
//   const contact = req.body.contact;
//   const join_date = req.body.date;
//   const role = req.body.role;
//   const salary = req.body.salary;

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
  const id = req.params.id;
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
