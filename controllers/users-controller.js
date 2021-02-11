const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Peter Ihimire",
    email: "peterihimire@gmail.com",
    password: "123456",
  },
];

// SIGNUP CONTROLLER
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError(
      "Invalid signup inputs passed, please check your data.",
      422
    );
    return next(error);
  }

  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signup failed , please try again later.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User with that email already exist, please try again with another email",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signup failed, please try again later.", 500);
    return next(error);
  }
  res.status(201).json({
    message: "Signup successful !",
    user: createdUser.toObject({ getters: true }),
  });
};

// LOGIN CONTROLLER
const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((user) => {
    user.email == email;
  });
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "User not identified, check credentials and try again.",
      401
    );
  }
  res.json({ message: "Yeah, I bet you , we are comming there!" });
};

exports.signup = signup;
exports.login = login;
