const Property = require("../models/property");

// @route GET api/properties
// @desc To retrieve all properties
// @access Public
const getProperties = (req, res, next) => {
  Property.findAll()
    .then((properties) => {
      res.status(200).json({
        status: "All Properties",
        properties: properties,
      });
    })
    .catch((err) => console.log(err));
};

// @route GET api/properties/id
// @desc To retrieve a single property with a particular id
// @access Public
const getPropertiesById = (req, res, next) => {
  const propertyId = req.params.propertyId;
  Property.findByPk(propertyId)
    .then((property) => {
      res.status(200).json({
        status: "Single Property",
        property: property,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProperties = getProperties;
exports.getPropertiesById = getPropertiesById;
