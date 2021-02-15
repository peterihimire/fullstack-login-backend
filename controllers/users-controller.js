const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

// const DUMMY_USERS = [
//   {
//     id: "u1",
//     name: "Peter Ihimire",
//     email: "peterihimire@gmail.com",
//     password: "123456",
//   },
// ];

// SIGNUP CONTROLLER
const signup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user = new User(name, email, password);
  user.save();
  res.status(201).json({
    message: "Signup successful !",
    user: user,
  });
};

// GET USERS CONTROLLER
const getUsers = (req, res, next) => {
  const users = User.fetchAll();
  res.status(200).json({
    message: "All users",
    users: users,
  });
};

// LOGIN CONTROLLER
const login = (req, res, next) => {
  res.json({ message: "Yeah, I bet you , we are comming there!" });
};

exports.signup = signup;
exports.getUsers = getUsers;
exports.login = login;
