const express = require("express");
const { check } = require("express-validator");

const adminController = require("../controllers/admin-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// // THIS MAKES SURE THE BELOW ROUTES ARE PROTECTED, SO REQ WITHOUT A VALID TOKEN WILL NOT REACH THE BELOW ROUTES
// router.use(checkAuth);

// /api/admin/users/property => POST
router.post(
  "/property",
  [
    check("name").not().isEmpty().withMessage("Name field musy not be empty"),
    check("slug").not().isEmpty(),
    check("location").not().isEmpty(),
    check("amount").isNumeric(),
    check("completion").isNumeric(),
    check("description").isLength({ min: 5 }),
    check("images").not().isEmpty(),
  ],
  adminController.createProperty
);

// /api/admin/properties => GET
router.get("/properties", checkAuth, adminController.getProperties);

// /api/admin/properties/propertyId => GET
router.get("/properties/:propertyId", adminController.getPropertiesById);

// /api/admin/properties/propertyId => PUT
router.put(
  "/properties/:propertyId",
  [
    check("name").not().isEmpty(),
    check("slug").not().isEmpty(),
    check("location").not().isEmpty(),
    check("amount").isNumeric(),
    check("completion").isNumeric(),
    check("description").isLength({ min: 5 }),
    check("images").not().isEmpty(),
  ],
  adminController.updatePropertiesById
);

// /api/admin/properties/propertyId => DELETE
router.delete("/properties/:propertyId", adminController.deletePropertiesById);

// /api/admin/users => GET
router.get("/users",checkAuth, adminController.getUsers);

// /api/admin/users/userId => GET
router.get("/users/:userId", adminController.getUserById);

// /api/admin/users/userId => DELETE
router.delete("/users/:userId", adminController.deleteUserById);

module.exports = router;
