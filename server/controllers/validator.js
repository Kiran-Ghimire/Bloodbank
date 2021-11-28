const db = require("./db_controller.js");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports.validLeave = function (req) {
  req.check("name", "Name is required").notEmpty();
};
