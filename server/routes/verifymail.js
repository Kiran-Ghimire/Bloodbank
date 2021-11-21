const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/database");

// router.get('/',function(req,res){
//     res.render('auth/verify.ejs');
// });

router.post("/verifyuser", function (req, res) {
  const id = req.body.userid;
  const token = req.body.token;
  db.matchtoken(id, token, function (err, result) {
    console.log(result);
    if (result.length > 0) {
      const email = result[0].email;
      const emailstatus = "verified";
      db.updateverify(email, emailstatus, function (err, result1) {
        res.status(200).json(result1);
      });
    } else {
      res.send("Token did not match");
    }
  });
});

module.exports = router;
