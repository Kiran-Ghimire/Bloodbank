const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const cors = require("cors");

const ejs = require("ejs");
const multer = require("multer");
const path = require("path");
const async = require("async");
const nodmailer = require("nodemailer");
const crypto = require("crypto");
const expressValidator = require("express-validator");
const sweetalert = require("sweetalert2");
const app = express();

const bodyParser = require("body-parser");

const login = require("./controllers/login");
const profile = require("./controllers/profile");
const signup = require("./controllers/signup");
const home = require("./controllers/home");

const users = require("./controllers/users");
const db = require("./models/db_controller");
const reset = require("./controllers/reset_controller");
const set = require("./controllers/set_controller");
const donors = require("./controllers/donors.js");
const logout = require("./controllers/logout");
const verify = require("./controllers/verify");
const userRequests = require("./controllers/userRequests");
const userRegister = require("./routes/signup");
const verifyUser = require("./routes/verifymail");
const loginUser = require("./routes/login");
const logoutUser = require("./routes/logout");
const userPasswordReset = require("./routes/resetPassword");
const userSetPassword = require("./routes/setPassword");
const becomeDonor = require("./routes/becomeDonor");
const profileUser = require("./routes/profileUser");
const changePassword = require("./routes/changePassword");
const searchDonor = require("./routes/searchDonorUser");
const requestAdmin = require("./routes/requestAdmin");

app.set("view engine ", "ejs");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());
//app.use(expressValidator());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(userRegister);
app.use(verifyUser);
app.use(loginUser);
app.use(userPasswordReset);
app.use(userSetPassword);
app.use("/signup", signup);

app.use("/verify", verify);
app.use("/login", login);
app.use("/setpassword", set);
app.use("/resetpassword", reset);
app.use("/", home);
app.use(profileUser);
app.use(profile);
app.use(changePassword);
app.use(searchDonor);
app.use(requestAdmin);
app.use(userRequests);
app.use("/users", users);

app.use(becomeDonor);
app.use("/donors", donors);
app.use("/userlogout", logoutUser);
app.use("/logout", logout);

const server = app.listen(3001, function () {
  console.log("server started");
});
