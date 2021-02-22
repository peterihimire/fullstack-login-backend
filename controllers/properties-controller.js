const Property = require("../models/property");
const Booking = require("../models/booking");

// @route GET api/properties
// @desc To retrieve all properties
// @access Public
const getProperties = (req, res, next) => {
  Property.findAll()
    .then((properties) => {
      res.status(200).json({
        status: "Successful",
        msg: "All Properties",
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
        status: "Successful",
        msg: "Single Property",
        property: property,
      });
    })
    .catch((err) => console.log(err));
};

// @route GET api/properties/booking
// @desc To retrieve our booked properties
// @access Public
const getBooking = (req, res, next) => {
  console.log(req.user.booking);
  req.user
    .getBooking()
    .then((booking) => {
      console.log(booking);
      booking
        .getProperties()
        .then((properties) => {
          console.log(properties);
          res.status(200).json({
            status: "Successful",
            msg: "Booked Properties",
            properties: properties,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

// @route GET api/properties/booking
// @desc To retrieve our booked properties
// @access Public
const createBooking = (req, res, next) => {
  const propertyId = req.params.propertyId;
  req.user
    .getBooking()
    .then((booking) => {
      console.log(booking);
      return booking.getProperties({ where: { id: propertyId } });
    })
    .then((properties) => {
      let property;
      if (properties.length > 0) {
        property = properties[0];
      }
    })
    .catch((err) => console.log(err));
};

exports.getProperties = getProperties;
exports.getPropertiesById = getPropertiesById;
exports.getBooking = getBooking;
exports.createBooking = createBooking;
