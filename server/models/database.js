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

module.exports.checkUser = function (email, callback) {
  const query = "select * from user where email = '" + email + "' ";
  con.query(query, callback);
};

module.exports.signup = function (
  username,
  email,
  hash,
  dob,
  phone,
  gender,
  bloodtype,
  address,
  role,
  emailstatus,
  reqstatus,
  callback
) {
  const query =
    "INSERT INTO `user`(`username`,`email`,`password`, `dob`, `phone`, `gender`, `bloodtype`, `address`, `role`, `emailstatus`, `reqstatus`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    hash +
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
    "','" +
    reqstatus +
    "' )";
  con.query(query, callback);
};

module.exports.loginUser = function (email, callback) {
  const query = "select * from user where email = '" + email + "' ";
  con.query(query, callback);
  console.log(query);
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
//     const query = "insert into verify (username,email,token) values (?,?,?)";
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
  const query = "select * from user where email='" + email + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.findTemp = function (id, callback) {
  const query = "select * from temp where id='" + id + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.findUserVerify = function (id, callback) {
  const query = "select * from verify where id='" + id + "'";
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

module.exports.setpassword = function (id, hash, callback) {
  const query =
    "update `user` set `password`='" + hash + "' where userid='" + id + "'";
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
  const query =
    "select * from `verifyadmin` where token='" + token + "' and id=" + id;
  con.query(query, callback);
  console.log(query);
};

module.exports.updateverifyAdmin = function (email, email_status, callback) {
  const query =
    "update `adminuser` set `email_status`='" +
    email_status +
    "' where `email`='" +
    email +
    "'";
  con.query(query, callback);
};

module.exports.findOneAdmin = function (email, callback) {
  const query = "select *from adminuser where email='" + email + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.tempAdmin = function (id, email, token, callback) {
  const query =
    "insert into `tempadmin` (`id`,`email`,`token`) values ('" +
    id +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

module.exports.updateTemp = function (id, token, callback) {
  const query = "update temp set token ='" + token + "' where id=" + id;
  con.query(query, callback);
  console.log(query);
};

module.exports.checktokenAdmin = function (token, callback) {
  const query = "select * from tempadmin where token='" + token + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.setpasswordAdmin = function (id, newpassword, callback) {
  const query =
    "update `adminuser` set `password`='" + newpassword + "' where id=" + id;
  con.query(query, callback);
};

module.exports.getAllUser = function (callback) {
  const query = "select * from user";
  con.query(query, callback);
};

module.exports.editUserProfile = function (
  id,
  username,
  email,
  dob,
  phone,
  gender,
  bloodtype,
  address,
  role,
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
    "' where userid=" +
    id;
  con.query(query, callback);
  console.log(query);
};

module.exports.getUserbyId = function (id, callback) {
  const query = "select * from user where userid =" + id + "";
  con.query(query, callback);
  console.log("getUserbyId", query);
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
  const query = 'SELECT  * from user where username like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllUser = function (callback) {
  const query = "select * from user";
  con.query(query, callback);
};

module.exports.getuserdetails = function (username, callback) {
  const query = "select * from adminuser where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.editProfile = function (
  id,
  username,
  email,
  password,
  callback
) {
  const query =
    "update adminuser set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where id=" +
    id;
  con.query(query, callback);
  console.log(query);
};

module.exports.getDonor = function (id, callback) {
  const query = "select * from user where userid= '" + id + "'";
  con.query(query, callback);
};

module.exports.editRole = function (id, role, callback) {
  const query = "update user set role='" + role + "' where userid=" + id;
  con.query(query, callback);
};

module.exports.becomeDonor = function (id, callback) {
  const query = "update user set role='Donor' where userid='" + id + "'";
  con.query(query, callback);
};
// UPDATE `user` SET `role` = 'Donor' WHERE `user`.`userid` = 36;

module.exports.getAllDonor = function (callback) {
  const query = "select * from user where role= 'Donor'";
  con.query(query, callback);
};

module.exports.getDonorbyId = function (id, callback) {
  const query = "select * from user where role='Donor' and userid =" + id;
  con.query(query, callback);
  console.log(query);
};

module.exports.editDonor = function (
  id,
  username,
  email,
  dob,
  phone,
  gender,
  bloodtype,
  address,
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
    "' where userid=" +
    id;
  con.query(query, callback);
  console.log(query);
};

module.exports.deleteDonor = function (id, callback) {
  const query = "delete  from user where role='Donor' and userid =" + id;
  con.query(query, callback);
  console.log(query);
};

module.exports.searchDonor = function (key, callback) {
  const query =
    'SELECT  * from user where username like "%' + key + '%" and role="Donor"';
  con.query(query, callback);
  console.log(query);
};

module.exports.searchDonorUser = function (key1, key2, callback) {
  const query =
    'SELECT  * from user where  role="Donor" and   address like "%' +
    key1 +
    '%"  and bloodtype like "%' +
    key2 +
    '%" ';
  con.query(query, callback);
  console.log(query);
};

module.exports.getUserPw = function (id, callback) {
  const query = "select * from user where  userid =" + id + "";
  con.query(query, callback);
  console.log("getUserPw", query);
};

module.exports.changePassword = function (id, hash, callback) {
  const query =
    "update `user` set `password`='" + hash + "'  where userid=" + id;
  con.query(query, callback);
  console.log(query);
};

module.exports.updateReqStatus = function (id, reqstatus, callback) {
  const query =
    "update `user` set `reqstatus`='" +
    reqstatus +
    "' where `userid`='" +
    id +
    "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.totalReqStatus = function (callback) {
  const query = "select * from user where reqstatus= 'Requested'";
  con.query(query, callback);
  console.log(query);
};

module.exports.totalReqApproved = function (id, callback) {
  const query =
    "select username, email, dob, phone, address, bloodtype, gender from user where reqstatus= 'Approved' and userid='" +
    id +
    "";
  con.query(query, callback);
  console.log(query);
};
