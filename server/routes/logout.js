var express = require("express");
var router = express.Router();

router.get("/userlogout", function (req, res) {
  //req.session.username = null;
  res.clearCookie("username");
});

module.exports = router;
