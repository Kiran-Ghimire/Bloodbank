const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const db = require.main.require("./models/database");

router.get("*", function (req, res, next) {
  if (req.cookies["username"] == null) {
    res.redirect("/login");
  } else {
    next();
  }
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets/images/upload_images"); //here we specify the destination. in this case i specified the current directory
//   },
//   filename: function (req, file, cb) {
//     console.log(file); //log the file object info in console
//     cb(null, file.originalname); //here we specify the file saving name. in this case.
//     //i specified the original file name .you can modify this name to anything you want
//   },
// });

// const upload = multer({ storage: storage });

router.get("/", function (req, res) {
  db.getAllUser(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.render("user/users.ejs", { list: result });
  });
});

router.get("/editUser/:id", function (req, res) {
  const id = req.params.id;

  db.getUserbyId(id, function (err, result) {
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
  db.getUserbyId(id, function (err, result) {
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

//  router.get('/search',function(req,res){
//      res.rende
//      const key = req.body.search;
//      console.log(key);
//     db.searchDoc(key,function(err, rows, fields) {
//         if (err) throw err;
//       const data=[];
//       for(i=0;i<rows.length;i++)
//         {
//           data.push(rows[i].first_name);
//         }
//         res.end(JSON.stringify(data));
//       });
//     });

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
