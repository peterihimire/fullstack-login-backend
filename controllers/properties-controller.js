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
  const propertyId = req.body.propertyId;
  console.log(propertyId);
  let fetchedBooking;
  let newQuantity = 1;
  req.user
    .getBooking()
    .then((booking) => {
      console.log(booking);
      fetchedBooking = booking;
      return booking.getProperties({ where: { id: propertyId } });
    })
    .then((properties) => {
      console.log(properties);
      let property;
      if (properties.length > 0) {
        property = properties[0];
      }
      return Property.findByPk(propertyId)
        .then((property) => {
          console.log(property);
          return fetchedBooking.addProperty(property, {
            through: { quantity: newQuantity },
          });
        })
        .catch((err) => console.log(err));
    })
    .then((booking) => {
      console.log(booking);
      res.status(200).json({
        status: "Successful",
        msg: "SIngle Booking Item Created",
        booking: booking,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProperties = getProperties;
exports.getPropertiesById = getPropertiesById;
exports.getBooking = getBooking;
exports.createBooking = createBooking;
