const User = require("../models/user");
const Property = require("../models/property");

// CREATE PROPERTY CONTROLLER
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
        status: "Property Creation successful !",
        property: property,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

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

// UPDATE A SINGLE PROPERTY
const updatePropertiesById = (req, res, next) => {
  const propertyId = req.params.propertyId;
  const { name, slug, location, amount, completion, detail, images } = req.body;

  Property.findByPk(propertyId)
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
        status: "Property update successful",
        property: updatedProperty,
      });
    })
    .catch((err) => console.log(err));
};

// DELETE A SINGLE PROPERTY
const deletePropertiesById = (req, res, next) => {
  const propertyId = req.params.propertyId;
  Property.findByPk(propertyId)
    .then((property) => {
      console.log(property);
      return property.destroy();
    })
    .then((result) => {
      res.status(200).json({
        message: "Property Delete Successful",
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
// GET ALL USERS CONTROLLER
const getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({
        message: "All users",
        users: users,
      });
    })
    .catch((err) => console.log(err));
};

// GET A SINGLE USER
const getUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      res.status(200).json({
        message: "Single user",
        user: user,
      });
    })
    .catch((err) => console.log(err));
};

// EDIT A SINGLE USER
const getUpdateUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(300).json({
          message: "No user found",
        });
      }
      res.status(201).json({
        message: "User update successful",
        user: user,
      });
    })
    .catch((err) => console.log(err));
};

// EDIT A SINGLE USER
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
        message: "User update successful",
        user: updatedUser,
      });
    })
    .catch((err) => console.log(err));
};

// DELETE A SINGLE USER
const deleteUserById = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      console.log(user);
      return user.destroy();
    })
    .then((result) => {
      res.status(200).json({
        message: "User Delete Successful",
        user: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.createProperty = createProperty;
exports.getProperties = getProperties;
exports.getPropertiesById = getPropertiesById;
exports.updatePropertiesById = updatePropertiesById;
exports.deletePropertiesById = deletePropertiesById;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.editUser = updateUser;
exports.deleteUser = deleteUserById;
