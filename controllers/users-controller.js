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

// GET ALL USERS CONTROLLER
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

// GET A SINGLE USER
const getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(([user]) => {
      res.status(200).json({
        message: "Single user",
        user: user[0],
      });
    })
    .catch((err) => console.log(err));
};

// EDIT A SINGLE USER
const updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, password } = req.body;
  let updatedUser;

  User.findById(userId)
    .then(([updatedUser]) => {
      updatedUser.name = name;
      updatedUser.email = email;
      updatedUser.password = password;
      console.log(updatedUser);
    })
    .then((updatedUser) => {
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    })
    .catch((err) => console.log(err));
};

// DELETE A SINGLE USER
const deleteUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.deleteById(userId)
    .then(([user]) => {
      console.log(user);
      res.status(200).json({
        message: "Deleted user Successful",
        user: user,
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
exports.getUser = getUser;
exports.editUser = updateUser;
exports.deleteUser = deleteUserById;
exports.login = login;
// const { name, email, password } = req.body;
// let updatedUser;
// updatedUser = User.findById(userId)
//   .then(([updatedUser]) => {
//     updatedUser.name = name;
//     updatedUser.email = email;
//     updatedUser.password = password;
//     console.log(updatedUser);
//     // res.status(200).json({
//     //   message: "User updated successfully",
//     //   user: user[0],
//     // });
//   })
