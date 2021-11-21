const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/database");

// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// router.get('/',function(req,res){

//     res.render('auth/setpassword.ejs');
// });

router.post("/usersetpassword", function (req, res) {
  const token = req.body.token;
  db.checktoken(token, function (err, result) {
    console.log(result);
    if (result.length > 0) {
      console.log(result);
      const newpassword = req.body.password;
      const id = result[0].id;
      db.setpassword(id, newpassword, function (err, result1) {
        console.log("result1", result1);
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

module.exports = router;
