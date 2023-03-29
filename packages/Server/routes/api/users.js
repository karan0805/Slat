let mongoose = require("mongoose");
let router = require("express").Router();
let User = mongoose.model("UserModel");
const bcrypt = require("bcryptjs");
let {
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
} = require("express-http-response");
const { isAuth } = require("../../validation");

router.post("/usersettings", isAuth, async function (req, res, next) {
  console.log(req.body);
  try {
    let user = await User.findById(req.user._id);
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.skills = req.body.skills;
    await user.save();
    next(new OkResponse({}));
  } catch (error) {
    //console.log(error);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/changepassword", isAuth, async function (req, res, next) {
  try {
    let user = await User.findById(req.user._id);
    password = req.body.oldpassword;

    bcrypt.compare(password, user.password).then(async (isMatch) => {
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
            user.password = hash;
            user
              .save()
              .then(function (user) {
                next(new OkResponse({}));
              })
              .catch(function (err) {
                console.log(err);
                next(new BadRequestResponse("Something went wrong.", 422));
              });
          });
        });
      } else {
        next(new BadRequestResponse("Old Password Incorrect.", 422));
      }
    });
  } catch (error) {
    console.log(error);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

module.exports = router;
