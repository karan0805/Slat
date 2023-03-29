const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const faker = require("faker");
let {
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
} = require("express-http-response");

const { registerEmail, loginEmail } = require("../../validation/users");
const { isEmailExist, isLoginEmailExist, isAuth } = require("../../validation");

const User = require("../../models/UserModel");
const Organization = require("../../models/OrganizationModel");

const mail = require("./../../config/mailer");

router.post(
  "/register",
  registerEmail,
  isEmailExist,
  async (req, res, next) => {
    let newUser = new User();

    newUser.username =
      req.body.fullName.replace(/\s/g, "") + faker.random.number(9999);
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.image = `https://avatars.dicebear.com/api/initials/${req.body.fullName}.svg`;

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(function (user) {
            let newOrg = new Organization();
            newOrg.orgName = user.fullName + " Workspace";
            newOrg.owner = user._id;
            newOrg.members = [user._id];
            newOrg.orgDesc = "Personal";
            newOrg.canDelete = false;
            newOrg
              .save()
              .then(function (org) {
                newUser.org = [org._id];
                newUser
                  .save()
                  .then(function (user) {
                    next(new OkResponse({}));
                  })
                  .catch(function (err) {
                    console.log(err);
                    next(new BadRequestResponse("Something went wrong.", 422));
                  });
              })
              .catch(function (err) {
                console.log(err);
                next(new BadRequestResponse("Something went wrong.", 422));
              });
          })
          .catch(function (err) {
            console.log(err);
            next(new BadRequestResponse("Something went wrong.", 422));
          });
      });
    });
  }
);

router.post("/login", loginEmail, isLoginEmailExist, async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .populate("org", "orgName owner")
    .then((user) => {
      bcrypt.compare(password, user.password).then(async (isMatch) => {
        if (isMatch) {
          const payload = {
            sub: user._id,
            name: user.fullName,
            iat: Date.now(),
          };

          const signedToken = jwt.sign(payload, keys.secretOrKey, {
            expiresIn: "86400",
          });

          const org = await Organization.findById(user.org[0]).populate(
            "projects",
            "name image  endDate status lead"
          );

          next(
            new OkResponse({
              user: user,
              activeOrg: user.org[0],
              orgDetails: org,
              token: "Bearer " + signedToken,
              expiresIn: "86400",
            })
          );
        } else {
          return res.status(400).json({ message: "Password incorrect" });
        }
      });
    });
});

router.post(
  "/forgot-pswd",
  loginEmail,
  isLoginEmailExist,
  async (req, res, next) => {
    const email = req.body.email;
    User.findOne({ email: email })
      .then((user) => {
        const payload = {
          sub: user._id,
          name: user.fullName,
          email: user.email,
          expiry: new Date(new Date().getTime() + 30 * 60000),
        };
        const signedToken = jwt.sign(payload, keys.secretOrKey);

        try {
          mail.sendForgotLink({
            from: " Slat - A Workflow Management System <slat@karan0805.me>",
            to: req.body.email,
            subject: "Reset Password",
            templateObj: {
              variables: {
                Name: user.fullName,
                resetURL:
                  req.body.REACT_APP_FRONTENDURL +
                  "/auth/reset-password?token=" +
                  signedToken,
              },
            },
          });
          res.send(new OkResponse({}));
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
        next(new BadRequestResponse("Something went wrong.", 422));
      });
  }
);

router.post("/reset-pswd", async (req, res, next) => {
  const token = req.body.token;
  const password = req.body.newpasswd;

  try {
    const header = jwt.decode(token);
    if (header) {
      User.findOne({ email: header.email }, (err, user) => {
        if (err) {
          console.log(err);
          next(new BadRequestResponse("Invalid Request", 422));
        }
        if (user) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then(function (user) {
                  res.send(new OkResponse({}));
                })
                .catch(function (err) {
                  console.log(err);
                  next(new BadRequestResponse("Invalid Request.", 422));
                });
            });
          });
        }
      });
    } else {
      next(new BadRequestResponse("Invalid Link", 422));
    }
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something Went Wrong", 422));
  }
});

router.post("/updateContext", isAuth, async (req, res, next) => {
  console.log(req.body);
  User.findById(req.user._id)
    .populate("org", "orgName owner")
    .then(async (user) => {
      let org = null;
      if (req.body.activeOrg) {
        org = await Organization.findById(req.body.activeOrg._id).populate(
          "projects",
          "name image endDate status lead"
        );
      } else {
        org = await Organization.findById(user.org[0]).populate(
          "projects",
          "name image endDate status lead"
        );
      }

      next(
        new OkResponse({
          user: user,
          activeOrg: { _id: org._id, orgName: org.orgName, owner: org.owner },
          orgDetails: org,
        })
      );
    });
});

module.exports = router;
