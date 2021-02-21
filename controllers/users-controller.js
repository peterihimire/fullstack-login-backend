const HttpError = require("../models/http-error");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// @route POST api/user/signup
// @desc To create or signup a user
// @access Public
const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your fields.", 422)
    );
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return next(new HttpError("Input missing required fields.", 400));
  }
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        return next(new HttpError("A user with this email does  exist .", 422)); //422 code is used for invalid inputs
      } else {
        return bcrypt
          .hash(password, 12) //salt 12 round
          .then((hashedPw) => {
            console.log(hashedPw);
            User.create({
              name: name,
              email: email,
              password: hashedPw,
            })
              .then((uzer) => {
                res.status(201).json({
                  status: "Successful",
                  msg: "User Signedup !",
                  user: uzer,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

// @route POST api/user/login
// @desc To authenticate or login an already registered  user
// @access Public
const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return next(
      new HttpError("Request missing username or password parameters.", 400)
    );
  }

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return next(
          new HttpError("A user with this credential does not exist .", 401)
        );
      }
      return user;
    })
    .then((user) => {
      return bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          //domatch or the result here is a boolean true or false

          if (doMatch) {
            return res.status(200).json({
              status: "Successful",
              msg: "Now you are logged in",
              user: user,
            });
          }
          return next(new HttpError("Login failed, Password error .", 401));
        })
        .catch((err) => console.log(err));
    })

    .catch((err) => console.log(err));
};

exports.signup = signup;
exports.login = login;
