const User = require("../models/user");
const Property = require("../models/property");
const HttpError = require("../models/http-error");

// @route POST api/admin/property
// @desc To create a new property
// @access Public
const createProperty = (req, res, next) => {
  const name = req.body.name;
  const slug = req.body.slug;
  const location = req.body.location;
  const amount = req.body.amount;
  const completion = req.body.completion;
  const detail = req.body.detail;
  const images = req.body.images;

  Property.create({
    name: name,
    slug: slug,
    location: location,
    amount: amount,
    completion: completion,
    detail: detail,
    images: images,
  })
    .then((property) => {
      res.status(201).json({
        status: "Successful",
        msg: "Property Created",
        property: property,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// @route GET api/admin/properties
// @desc To retrieve the data of all properties
// @access Public
const getProperties = (req, res, next) => {
  Property.findAll()
    .then((properties) => {
      if (!properties || properties.length === 0) {
        const error = new Error("No properties found.");
        error.code = 404;
        return next(error);
      }
      res.status(200).json({
        status: "Successful",
        msg: "All Properties",
        properties: properties,
      });
    })
    .catch((err) => console.log(err));
};

// @route GET api/admin/properties/id
// @desc To retrieve the data of a single property
// @access Public
const getPropertiesById = (req, res, next) => {
  const propertyId = req.params.propertyId;
  Property.findByPk(propertyId)
    .then((property) => {
      if (!property) {
        const error = new Error("Property not found for this particular id."); // Error handling with only error middleware
        error.code = 404;
        return next(error);
      }
      res.status(200).json({
        status: "Successful",
        msg: "Single Property",
        property: property,
      });
    })
    .catch((err) => console.log(err));
};

// @route PUT api/admin/properties/id
// @desc To update the data of a single property
// @access Public
const updatePropertiesById = (req, res, next) => {
  const propertyId = req.params.propertyId;
  const { name, slug, location, amount, completion, detail, images } = req.body;

  Property.findByPk(propertyId)
    .then((property) => {
      if (!property) {
        return next(
          new HttpError("No property found for this particular id.", 404)
        );
      }
      return property;
    })
    .then((updatedProperty) => {
      updatedProperty.name = name;
      updatedProperty.slug = slug;
      updatedProperty.location = location;
      updatedProperty.amount = amount;
      updatedProperty.completion = completion;
      updatedProperty.detail = detail;
      updatedProperty.images = images;
      return updatedProperty.save();
    })
    .then((updatedProperty) => {
      res.status(200).json({
        status: "Successful",
        msg: "Property updated",
        property: updatedProperty,
      });
    })
    .catch((err) => console.log(err));
};

// @route DELETE api/admin/properties/id
// @desc To delete the data of a single property
// @access Private
const deletePropertiesById = (req, res, next) => {
  const propertyId = req.params.propertyId;
  Property.findByPk(propertyId)
    .then((property) => {
      // console.log(property);
      if (!property) {
        const error = new Error("Property not found for this particular id.");
        error.code = 404;
        return next(error);
      }
      return property;
    })
    .then((property) => {
      return property.destroy();
    })
    .then((result) => {
      res.status(200).json({
        status: "Successful",
        msg: "Property Deleted",
        user: result,
      });
    })
    .catch((err) => console.log(err));
};

// @route GET api/admin/users
// @desc To retrieve the data of all users
// @access Private
const getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      if (!users || users.length === 0) {
        const error = new Error("No users record found.");
        error.code = 404;
        return next(error);
      }
      return users;
    })
    .then((users) => {
      res.status(200).json({
        status: "Successful",
        msg: "All users",
        users: users,
      });
    })
    .catch((err) => console.log(err));
};

// @route GeT api/admin/users/id
// @desc To retrieve the data of a single user by id
// @access Public
const getUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return next(new HttpError("User not found for this specific id.", 404)); // Error handling with both error model and error middleware
      }
      res.status(200).json({
        status: "Successful",
        msg: "Single user",
        user: user,
      });
    })
    // User.findAll({ where: { Id: userId } })
    //   .then((product) => {
    //     res.status(200).json({
    //       message: "Single user",
    //       user: product[0],
    //     });
    //   })
    //   .catch((err) => console.log(err));
    .catch((err) => console.log(err));
};

// @route DELETE api/admin/property
// @desc To delete a user with a particular id
// @access Public
const deleteUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User for this particular id does not exist.");
        error.code = 404;
        return next(error);
      }
      return user;
    })
    .then((user) => {
      console.log(user);
      return user.destroy();
    })
    .then((result) => {
      res.status(200).json({
        status: "Successful",
        msg: "User Deleted",
        user: result,
      });
    })
    .catch((err) => console.log(err));
};
//
//
//
//
//

// @route POST api/users/id
// @desc To retrieve the data of all properties
// @access Public
const getUpdateUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: "Unsuccessful",
          msg: "No user found",
        }); // Error handling  directly on code
      }
      res.status(201).json({
        status: "Successful",
        msg: "User updated",
        user: user,
      });
    })
    .catch((err) => console.log(err));
};

// @route POST api/admin/property
// @desc To retrieve the data of all properties
// @access Public
const updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, password } = req.body;

  User.findByPk(userId)
    .then((updatedUser) => {
      updatedUser.name = name;
      updatedUser.email = email;
      updatedUser.password = password;
      return updatedUser.save();
    })
    .then((updatedUser) => {
      res.status(200).json({
        status: "Successful",
        msg: "User updated",
        user: updatedUser,
      });
    })
    .catch((err) => console.log(err));
};

// Node way of exporting multiple methods in a single file
exports.createProperty = createProperty;
exports.getProperties = getProperties;
exports.getPropertiesById = getPropertiesById;
exports.updatePropertiesById = updatePropertiesById;
exports.deletePropertiesById = deletePropertiesById;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.editUser = updateUser;
exports.deleteUserById = deleteUserById;
