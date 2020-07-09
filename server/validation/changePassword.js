const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangePasswordInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  // Email checks
  if (Validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = "password field is required";
  }
  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
