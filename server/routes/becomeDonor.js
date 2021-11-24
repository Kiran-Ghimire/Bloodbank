const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const db = require.main.require("./models/database");

// router.get("/becomedonor/:id", function (req, res) {
//   const id = req.params.id;

//   db.getAllDonor(id, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     res.status(200).json(result);
//   });
// });

router.post("/becomedonor/:id", function (req, res) {
  const id = req.params.id;
  db.becomeDonor(id, function (err, result) {
    if (err) throw err;

    //res.render('edit_doctor.ejs',{list:result});
    //   res.redirect("/users");
    db.getDonor(id, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).json({ result: result });
    });
  });
});

module.exports = router;
