const express = require("express");
const router = express.Router();
const db = require.main.require("./models/database");
const bcrypt = require("bcrypt");

// router.get("/changepassword", function (req, res) {
//   const id = req.body.id;
// });

router.post("/changepassword", async function (req, res) {
  const { newpassword } = req.body;
  const { password } = req.body.values;
  //   const newpassword = req.body.newpassword;
  const id = req.body.id;
  console.log(req.body);
  const saltRounds = await bcrypt.genSalt(10);

  db.getUserPw(id, (err, result) => {
    console.log("First Result", result);
    console.log("Pw", result[0].password);
    if (result[0].password === password) {
      bcrypt.hash(newpassword, saltRounds, (err, hash) => {
        db.changePassword(id, hash, (err, result) => {
          if (result) {
            console.log(result);
            db.getUserPw(id, function (err, result) {
              if (err) throw err;
              console.log(result);
              res.status(200).json({ result: result });
            });
          } else {
            res.send("There was some error");
          }
        });
      });
    } else {
      res.status(404).json({
        message: " Current Password didnot match.",
        type: "error",
      });
    }
  });
});

module.exports = router;
