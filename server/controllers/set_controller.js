var express = require("express");

var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/database");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = router;

router.get("/", function (req, res) {
  res.render("auth/setpassword.ejs");
});

router.post("/", function (req, res) {
  var token = req.body.token;
  db.checktokenAdmin(token, function (err, result) {
    if (result.length > 0) {
      console.log(result);
      var newpassword = req.body.password;
      var id = result[0].id;
      db.setpasswordAdmin(id, newpassword, function (err, result1) {
        if (err) {
          // console.log('token did not match');
          res.send("token did not match");
        } else {
          res.send("Password has been changed...Go to login page");
        }
      });
    } else {
      res.send("Token didnt match!!!");
    }
  });
});
