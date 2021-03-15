const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("module");

// MODELS
const sequelize = require("./util/database");
const Property = require("./models/property");
const User = require("./models/user");
const Booking = require("./models/booking");
const BookingItem = require("./models/booking-item");

// ROUTES
const usersRoutes = require("./routes/users-routes");
const propertiesRoutes = require("./routes/properties-routes");
const adminRoutes = require("./routes/admin-routes");

const HttpError = require("./models/http-error");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single("image"));

// FOR C.O.R.S ERROR
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept, Origin, X-Requested-With, Authorization"
  );
  next();
});

// ROUTES MIDDLEWARE

// => /api/users/
app.use("/api/users", usersRoutes);

// => /api/properties/
app.use("/api/properties", propertiesRoutes);

// => /api/admin/
app.use("/api/admin", adminRoutes);

// ERROR HANDLING MIDDLEWARE FOR UNREGISTERED ROUTES
app.use((req, res, next) => {
  const error = new HttpError(
    "could not find this route! To access property api, use http://localhost:7000/api/properties",
    404
  );
  throw error;
});
// ERROR HANDLING MIDDLEWARE
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

const PORT = process.env.PORT || 7000;

// RELATIONS OR SEQUELIZE ASSOCIATIONS
User.hasOne(Booking);
Booking.belongsTo(User);
Booking.belongsToMany(Property, { through: BookingItem });
Property.belongsToMany(Booking, { through: BookingItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(PORT, function () {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
