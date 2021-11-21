const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bloodbank",
});

con.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("you are connected to bloodbank");
});

module.exports.signup = function (
  username,
  email,
  password,
  dob,
  phone,
  gender,
  bloodtype,
  address,
  role,
  emailstatus,
  callback
) {
  const query =
    "INSERT INTO `user`(`username`,`email`,`password`, `dob`, `phone`, `gender`, `bloodtype`, `address`, `role`, `emailstatus`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "', '" +
    dob +
    "', '" +
    phone +
    "','" +
    gender +
    "','" +
    bloodtype +
    "','" +
    address +
    "','" +
    role +
    "', '" +
    emailstatus +
    "' )";
  con.query(query, callback);
};

// module.exports.signup = function(username,email,password,dob, phone, gender, bloodtype, address,role, emailstatus,callback) {
//     const query =  "INSERT INTO user (username,email,password, dob, phone, gender, bloodtype, address, role, emailstatus) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10 )";
//     con.query(query,callback);
// }

// module.exports.getuserid = function (email,callback){
//     const query = "select * from verify where email =?";
//     con.query(query,callback);
// }

// module.exports.verify = function (username,email,token,callback){
//     var query = "insert into verify (username,email,token) values (?,?,?)";
//     con.query(query,callback);
// }

module.exports.getuserid = function (email, callback) {
  const query = "select * from verify where email = '" + email + "' ";
  con.query(query, callback);
};

module.exports.verify = function (username, email, token, callback) {
  const query =
    "insert into `verify` (`username`,`email`,`token`) values ('" +
    username +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

module.exports.matchtoken = function (id, token, callback) {
  const query =
    "select * from `verify` where token='" + token + "' and id='" + id + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.updateverify = function (email, emailstatus, callback) {
  const query =
    "update `user` set `emailstatus`='" +
    emailstatus +
    "' where `email`='" +
    email +
    "'";
  con.query(query, callback);
};

module.exports.findOne = function (email, callback) {
  const query = "select *from user where email='" + email + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.temp = function (id, email, token, callback) {
  const query =
    "insert into `temp` (`id`,`email`,`token`) values ('" +
    id +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

module.exports.checktoken = function (token, callback) {
  const query = "select * from `temp` where token='" + token + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.setpassword = function (id, newpassword, callback) {
  const query =
    "update `user` set `password`='" +
    newpassword +
    "' where userid='" +
    id +
    "'";
  con.query(query, callback);
};

module.exports.signupAdmin = function (
  username,
  email,
  password,
  status,
  callback
) {
  const query =
    "INSERT INTO `adminuser`(`username`,`email`,`password`,`email_status`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "','" +
    status +
    "')";
  con.query(query, callback);
};

module.exports.getuseridAdmin = function (email, callback) {
  const query = "select *from verifyadmin where email = '" + email + "' ";
  con.query(query, callback);
};

module.exports.verifyAdmin = function (username, email, token, callback) {
  const query =
    "insert into `verifyadmin` (`username`,`email`,`token`) values ('" +
    username +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

module.exports.matchtokenAdmin = function (id, token, callback) {
  var query =
    "select * from `verifyadmin` where token='" + token + "' and id=" + id;
  con.query(query, callback);
  console.log(query);
};

module.exports.updateverifyAdmin = function (email, email_status, callback) {
  var query =
    "update `adminuser` set `email_status`='" +
    email_status +
    "' where `email`='" +
    email +
    "'";
  con.query(query, callback);
};

module.exports.findOneAdmin = function (email, callback) {
  var query = "select *from adminuser where email='" + email + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.tempAdmin = function (id, email, token, callback) {
  var query =
    "insert into `tempadmin` (`id`,`email`,`token`) values ('" +
    id +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

module.exports.checktokenAdmin = function (token, callback) {
  var query = "select * from tempadmin where token='" + token + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.setpasswordAdmin = function (id, newpassword, callback) {
  var query =
    "update `adminuser` set `password`='" + newpassword + "' where id=" + id;
  con.query(query, callback);
};

module.exports.getAllUser = function (callback) {
  var query = "select * from user";
  con.query(query, callback);
};

module.exports.getUserbyId = function (id, callback) {
  const query = "select * from user where userid =" + id + "";
  con.query(query, callback);
};

module.exports.editUser = function (
  id,
  username,
  email,
  dob,
  phone,
  gender,
  bloodtype,
  address,
  role,
  emailstatus,
  callback
) {
  const query =
    "update `user` set `username`='" +
    username +
    "', `email`= '" +
    email +
    "', `dob`= '" +
    dob +
    "', `phone` = '" +
    phone +
    "', `gender` = '" +
    gender +
    "', `bloodtype` = '" +
    bloodtype +
    "', `address` = '" +
    address +
    "', `role` = '" +
    role +
    "', `emailstatus`= '" +
    emailstatus +
    "' where userid=" +
    id;
  con.query(query, callback);
  // console.log(query);
};

module.exports.deleteUser = function (id, callback) {
  //console.log("i m here");
  const query = "delete from user where userid=" + id;
  con.query(query, callback);
};

module.exports.searchUser = function (key, callback) {
  var query = 'SELECT  *from user where username like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};
