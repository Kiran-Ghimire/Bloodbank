const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require.main.require("./models/database");

router.post(
  "/userlogin",

  function (req, res) {
    const { username, password } = req.body;

    db.loginUser(username, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      console.log(result);
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          console.log("p1", password);
          console.log("p2", result[0].password);

          console.log("response", response);

          if (response) {
            req.session = username;

            const id = result[0].userid;
            const token = jwt.sign({ id }, "jwtSecret", {
              expiresIn: 300,
            });
            // req.session.username = result;

            res.json({ auth: true, token: token, result: result });
          } else {
            res.json({
              auth: false,
              message: "Wrong email/password combination!",
            });
          }
        });
        // });
      } else {
        res.json({ auth: false, message: "no user exists" });
      }
    });
  }
);

// router.get("/userlogin", (req, res) => {
//   if (req.session) {
//     res.send({ loggedIn: true, user: req.session });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

module.exports = router;
// router.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

// router.post(
//   "/userlogin",
//   [
//     check("username").notEmpty().withMessage("Username is reequired"),
//     check("password").notEmpty().withMessage("Password is required"),
//   ],
//   function (req, res) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }

//     const username = req.body.username;
//     const password = req.body.password;

//     if (username && password) {
//       con.query(
//         "select * from user where username = ? and password = ?",
//         [username, password],
//         function (error, results, fields) {
//           if (results.length > 0) {
//             req.session.loggedin = true;
//             req.session.username = username;
//             res.cookie("username", username);
//             const status = results[0].emailstatus;
//             if (status === "not_verified") {
//               res.json("please verify your email");
//             } else {
//               sweetalert.fire("logged In!");
//               res.status(200).json(results);
//             }
//           } else {
//             res.send("Incorrect username / password");
//           }
//           res.end();
//         }
//       );
//     } else {
//       res.send("please enter user name and password");
//       res.end();
//     }
//   }
// );
