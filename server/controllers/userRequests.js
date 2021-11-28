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

// router.get("/addrequest", function (req, res) {
//   res.render("userRequest/addRequest.ejs");
// });

// router.post("/addrequest", function (req, res) {
//   var name = req.body.name;
//   var p_date = req.body.p_date;
//   var expire = req.body.expire;
//   var e_date = req.body.e_date;
//   var price = req.body.price;
//   var quantity = req.body.quantity;

//   db.addMed(
//     name,
//     p_date,
//     expire,
//     e_date,
//     price,
//     quantity,
//     function (err, result) {
//       res.redirect("/userrequests");
//     }
//   );
// });

router.get("/approverequest/:id", function (req, res) {
  const id = req.params.id;
  db.getUserbyId(id, function (err, result) {
    res.render("userRequest/approveRequest.ejs", { list: result });
  });
});

router.post("/approverequest/:id", function (req, res) {
  const id = req.params.id;
  const reqstatus = "Approved";
  db.updateReqStatus(id, reqstatus, function (err, result) {
    res.redirect("/userrequests");
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
