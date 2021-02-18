const Property = require("../models/property");

// READ ALL PROPERTIES CONTROLLER
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

// READ A SINGLE PROPERTY
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