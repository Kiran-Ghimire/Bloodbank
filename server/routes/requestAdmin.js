const express = require("express");
const router = express.Router();
const db = require.main.require("./models/database");

router.post("/requestdonor/:id", (req, res) => {
  const id = req.params.id;
  const reqstatus = "Requested";
  db.updateReqStatus(id, reqstatus, (err, result) => {
    if (err) throw err;
    db.getDonor(id, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).json({ result: result });
    });
  });
});

module.exports = router;
