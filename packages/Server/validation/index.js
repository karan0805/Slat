let { OkResponse, BadRequestResponse } = require("express-http-response");

let mongoose = require("mongoose");
let User = mongoose.model("UserModel");
const passport = require("passport");

const isUpdateEmailExist = (req, res, next) => {
  if (req.user && req.user.email !== req.body.user.email) {
    User.count({ $and: [{ email: req.body.user.email }] }, (err, count) => {
      if (err) {
        next(new InternalServerErrorResponse());
      } else if (count > 0) {
        next(new BadRequestResponse("E-mail already exist.", 422.1));
      } else {
        next();
      }
    });
  } else {
    next();
  }
};

const isUpdateUsernameExist = (req, res, next) => {
  if (
    req.user &&
    req.user.username.toLowerCase() !== req.body.user.username.toLowerCase()
  ) {
    User.count(
      { username: { $regex: new RegExp(req.body.user.username, "i") } },
      (err, count) => {
        if (err) {
          next(new InternalServerErrorResponse());
        } else if (count > 0) {
          next(new BadRequestResponse("Username already exist.", 422.2));
        } else {
          next();
        }
      }
    );
  } else {
    next();
  }
};

const isEmailExist = (req, res, next) => {
  User.countDocuments({ email: req.body.email }, (err, count) => {
    if (err) {
      next(new InternalServerErrorResponse());
    } else if (count > 0) {
      next(new BadRequestResponse("E-mail already exist.", 422.1));
    } else {
      next();
    }
  });
};
const isLoginEmailExist = (req, res, next) => {
  User.countDocuments({ email: req.body.email }, (err, count) => {
    if (err) {
      next(new InternalServerErrorResponse());
    } else if (count == 0) {
      next(new BadRequestResponse("E-mail dont exist.", 422.1));
    } else {
      next();
    }
  });
};

const isAuth = passport.authenticate("jwt", { session: false });

module.exports = {
  isEmailExist,
  isLoginEmailExist,
  isUpdateEmailExist,
  isUpdateUsernameExist,
  isAuth,
};
