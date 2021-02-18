const express = require("express");

const propertiesController = require("../controllers/properties-controller");

const router = express.Router();

// /api/properties => GET
router.get("/", propertiesController.getProperties);

// /api/properties/propertyId => GET
router.get("/:propertyId", propertiesController.getPropertiesById);

module.exports = router;
