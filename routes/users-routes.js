const path = require("path");

const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

// /api/user/signup => GET
router.get("/signup", usersController.signup);

// /api/user/signup => POST
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

// /api/user/login => GET
router.get("/login", usersController.login);

// /api/user/login => POST
router.post("/login", usersController.login);

module.exports = router;
