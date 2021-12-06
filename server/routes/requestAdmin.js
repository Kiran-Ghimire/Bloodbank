const express = require("express");
const router = express.Router();
const db = require.main.require("./models/database");

router.post("/requestdonor", (req, res) => {
  const reqstatus = "Requested";
  console.log(req.body);
  const { donorid, userid } = req.body;

  db.reqStatus(donorid, userid, reqstatus, (err, result) => {
    if (err) throw err;
    db.getRequestUser(userid, reqstatus, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).json({ result: result });
    });
    console.log(result);
  });
});

router.post("/totalrequest", (req, res) => {
  const { userid } = req.body;
  db.getAllRequest(userid, (err, result) => {
    if (err) throw err;
    res.status(200).json({ result: result });
  });
});

module.exports = router;
