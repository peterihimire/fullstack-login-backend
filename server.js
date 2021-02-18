const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const sequelize = require("./util/database");

const usersRoutes = require("./routes/users-routes");
const propertiesRoutes = require("./routes/properties-routes");
const adminRoutes = require("./routes/admin-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

// => /api/users/
app.use("/api/users", usersRoutes);

// => /api/properties/
app.use("/api/properties", propertiesRoutes);

// => /api/admin/
app.use("/api/admin", adminRoutes);

// Error handling for unregistered routes
app.use((req, res, next) => {
  const error = new HttpError("could not find this route!", 404);
  throw error;
});
// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

const PORT = 7000;

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(PORT, function () {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));

// mongoose
//   .connect()
//   .then(() => {
//     app.listen(PORT, function () {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));
