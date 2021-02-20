const HttpError = require("../models/http-error");
const User = require("../models/user");

// @route POST api/user/signup
// @desc To create or signup a user
// @access Public
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
        status: "Successful",
        msg: "User Signup !",
        user: uzer,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// @route POST api/user/login
// @desc To authenticate or login an already registered  user
// @access Public
const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  if (!email || !password) {
    return next(
      new HttpError("Request missing username or password parameters.", 400)
    );
  }

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user || user.password !== password) {
        return next(
          new HttpError("A user with this credential does not exist .", 401)
        );
      }
      return res.status(200).json({
        status: "Successful",
        msg: "Now you are logged in",
        user: user,
      });
    })

    .catch((err) => console.log(err));
};

exports.signup = signup;
exports.login = login;
