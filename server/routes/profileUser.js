const express = require("express");
const router = express.Router();
const db = require.main.require("./models/database");

router.post("/editprofile", function (req, res) {
  // const id = req.params.id;
  db.editUserProfile(
    req.body.id,
    req.body.values.username,
    req.body.values.email,
    req.body.values.dob,
    req.body.values.phone,
    req.body.values.gender,
    req.body.values.bloodtype,
    req.body.values.address,

    console.log("reqbody", req.body),
    console.log("values", req.body.values, req.body.id),

    function (err, result) {
      console.log("edituser", result);
      if (err) throw err;
      // console.log("resulta", result);

      // res.status(200).json({ result: result });
    }
  );
  db.getUser(req.body.id, function (err, result) {
    if (err) throw err;
    console.log("RESULTTTTTTTTTTTT", result);

    res.status(200).json({ result: result });
  });
});

module.exports = router;
