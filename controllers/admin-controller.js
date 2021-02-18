const User = require("../models/user");

// POST / SIGNUP CONTROLLER
const signup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.create({
    name: name,
    email: email,
    password: password,
  })
    .then((uzer) => {
      res.status(201).json({
        message: "Signup successful !",
        user: uzer,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET ALL USERS CONTROLLER
const getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({
        message: "All users",
        users: users,
      });
    })
    .catch((err) => console.log(err));
};

// GET A SINGLE USER
const getUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      res.status(200).json({
        message: "Single user",
        user: user,
      });
    })
    .catch((err) => console.log(err));
  // User.findAll({ where: { Id: userId } })
  //   .then((product) => {
  //     res.status(200).json({
  //       message: "Single user",
  //       user: product[0],
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

// EDIT A SINGLE USER
const getUpdateUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(300).json({
          message: "No user found",
        });
      }
      res.status(201).json({
        message: "User update successful",
        user: user,
      });
    })
    .catch((err) => console.log(err));
};

// EDIT A SINGLE USER
const updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, password } = req.body;

  User.findByPk(userId)
    .then((updatedUser) => {
      updatedUser.name = name;
      updatedUser.email = email;
      updatedUser.password = password;
      return updatedUser.save();
    })
    .then((updatedUser) => {
      res.status(200).json({
        message: "User update successful",
        user: updatedUser,
      });
    })
    .catch((err) => console.log(err));
};

// DELETE A SINGLE USER
const deleteUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      console.log(user);
      return user.destroy();
    })
    .then((result) => {
      res.status(200).json({
        message: "User Delete Successful",
        user: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.signup = signup;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.editUser = updateUser;
exports.deleteUser = deleteUserById;