const path = require("path");

const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

// /api/users => GET
router.get("/", usersController.getUsers);

// /api/users/userId => GET
router.get("/:userId", usersController.getUser);

// /api/users/userId => PUT
router.put("/:userId", usersController.editUser);

// /api/users/signup => DELETE
router.delete("/:userId", usersController.deleteUser);

// /api/users/signup => POST
router.post("/signup", usersController.signup);

// /api/users/login => POST
router.post("/login", usersController.login);

module.exports = router;
