const express = require("express");
const router = express.Router();
const db = require.main.require("./models/database");

router.post("/searchdonor", (req, res) => {
  const key1 = req.body.address;
  const key2 = req.body.bloodtype;
  console.log("address", key1);
  console.log("bloodtype", key2);
  db.searchDonorUser(key1, key2, function (err, result) {
    if (err) throw err;
    console.log("searchResult", result);
    if (result) {
      res.send({ type: "Success", result: result });
    } else {
      res.send({ type: "Error", message: "There was some error" });
    }
  });
});

module.exports = router;
