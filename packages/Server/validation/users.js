const { check } = require("express-validator");

const registerEmail = [
  check("fullName").not().isEmpty(),
  check("email").not().isEmpty().isEmail(),
  check("password").not().isEmpty(),
];
const loginEmail = [
  check("email").not().isEmpty().isEmail(),
  check("password").not().isEmpty(),
];

module.exports = {
  registerEmail,
  loginEmail,
};
