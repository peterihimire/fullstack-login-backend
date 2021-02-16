const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

// SIGNUP CONTROLLER
const signup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user = new User(name, email, password);
  user
    .save()
    .then((uzer) => {
      // console.log(uzer[0]);
      res.status(201).json({
        message: "Signup successful !",
        user: uzer[0],
      });
    })
    .catch((err) => console.log(err));
};

// GET USERS CONTROLLER
// const getUsers = (req, res, next) => {

const getUsers = (req, res, next) => {
  User.fetchAll()
    // .then(([rows, fieldData]) => {
    //   res.status(200).json({
    //     message: "All users",
    //     users: rows,
    //   });
    // })
    .then((results) => {
      res.status(200).json({
        message: "All users",
        users: results[0],
      });
    })
    .catch((err) => console.log(err));
};

// LOGIN CONTROLLER
const login = (req, res, next) => {
  res.json({ message: "Yeah, I bet you , we are comming there!" });
};

exports.signup = signup;
exports.getUsers = getUsers;
exports.login = login;
