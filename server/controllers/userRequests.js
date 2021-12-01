const mysql = require("mysql");
const express = require("express");
const cookie = require("cookie-parser");
const db = require.main.require("./models/database");

const router = express.Router();
router.get("*", function (req, res, next) {
  if (req.cookies["username"] == null) {
    res.redirect("/login");
  } else {
    next();
  }
});

router.get("/userrequests", function (req, res) {
  db.totalReqStatus(function (err, result) {
    console.log("totalReqStatus", result);
    res.render("userRequest/userRequest.ejs", { list: result });
  });
});

router.get("/approverequest/:userid/:donorid", function (req, res) {
  const { userid, donorid } = req.params;
  console.log("alu", req.params);
  db.getUserbyId(userid, donorid, function (err, result) {
    console.log(result);
    res.render("userRequest/approveRequest.ejs", { list: result });
  });
});

router.post("/approverequest/:userid/:donorid", function (req, res) {
  const { userid, donorid } = req.params;
  console.log("matar", req.params);
  const reqstatus = "Approved";
  db.updateReqStatus(userid, donorid, reqstatus, function (err, result) {
    if (err) throw err;
    console.log("HALO", result);

    db.getFullDonorInfo(userid, (err, result) => {
      if (err) throw err;
      res.status(200).json({ result: result });
    });

    // res.redirect("/userrequests");
  });
});

router.post("/donorfulldata/:userid", function (req, res) {
  const { userid } = req.params;
  db.getFullDonorInfo(userid, (err, result) => {
    if (err) throw err;
    res.status(200).json({ result: result });
  });
});

router.get("/declinerequest/:id", function (req, res) {
  var id = req.params.id;
  db.getUserbyId(id, function (err, result) {
    res.render("userRequest/declineRequest.ejs", { list: result });
  });
});

router.post("/declinerequest/:id", function (req, res) {
  const id = req.params.id;
  const reqstatus = "Declined";
  db.updateReqStatus(id, reqstatus, function (err, result) {
    res.redirect("/userrequests");
  });
});

router.post("/userrequests/search", function (req, res) {
  var key = req.body.search;
  db.searchmed(key, function (err, result) {
    console.log(result);

    res.render("userRequest/userRequest.ejs", { list: result });
  });
});

module.exports = router;
