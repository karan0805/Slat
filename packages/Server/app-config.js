let path = require("path"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  errorhandler = require("errorhandler"),
  mongoose = require("mongoose"),
  httpResponse = require("express-http-response");

const compression = require("compression");
const connectDB = require("./config/db.js");
const passport = require("passport");

let isProduction = process.env.NODE_ENV === "production";

module.exports = (app) => {
  app.use(
    cors({
      credentials: true,
      origin: "*",
    })
  );
  app.use(compression());

  // Normal express config defaults
  app.use(require("morgan")("dev"));
  app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
  app.use(bodyParser.json({ limit: "500mb" }));

  app.use(require("method-override")());
  app.use(express.static(path.join(__dirname, "/public")));

  if (!isProduction) {
    app.use(errorhandler());
  }

  if (isProduction) {
    connectDB();
  } else {
    connectDB();
    mongoose.set("debug", true);
  }

  require("./models/UserModel");
  require("./models/OrganizationModel");
  require("./models/ProjectModel");
  require("./models/BoardModel");
  require("./models/EventModel");

  // Pass the global passport object into the configuration function
  require("./config/passport")(passport);

  // This will initialize the passport object on every request
  app.use(passport.initialize());

  app.use(require("./routes"));

  //  catch 404 and forward to error handler
  app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  app.use(httpResponse.Middleware);

  /// error handlers
  // will print stacktrace
  if (!isProduction) {
    app.use(function (err, req, res, next) {
      console.log(err.stack);
      res.status(err.status || 500);

      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });
};
