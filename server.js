const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const sequelize = require("./util/database");
const Property = require("./models/property");
const User = require("./models/user");

const usersRoutes = require("./routes/users-routes");
const propertiesRoutes = require("./routes/properties-routes");
const adminRoutes = require("./routes/admin-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

// This middleware stores the user in the req and makes it possible for the user to be accessible from anywhere in the project
app.use((req, res, next) => {
  // we will reach out to the database
  User.findByPk(1)
    .then((user) => {
      // console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// => /api/users/
app.use("/api/users", usersRoutes);

// => /api/properties/
app.use("/api/properties", propertiesRoutes);

// => /api/admin/
app.use("/api/admin", adminRoutes);

// Error handling for unregistered routes
app.use((req, res, next) => {
  const error = new HttpError(
    "could not find this route! To access property api, use http://localhost:7000/api/properties",
    404
  );
  throw error;
});
// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    status: "Unsuccessful",
    msg: error.message || "An unknown error occurred",
  });
});

const PORT = 7000;

// // A property created by a user, and once the user is deleted the properties associated with the user deletes aswell, we can configure it with optional parameters
// Property.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

// A user can select more than one property to booking list
// User.hasMany(Property);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    // console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Peter Ihimire",
        email: "pihimire@gmail.com",
        password: "1234567",
      });
    }
    return user; // or we can simply write [ return Promise.resolve(user) ] they all mean same as what is returned is always a promise that will technically resolve to a user.
  })
  .then((user) => {
    // console.log(user);
    app.listen(PORT, function () {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
// when we hit npm start it starts from the sequelize, but when we register a request it starts from the top down to the bottom , then at that time will it see the user already in the request funnel and makes use of it.
