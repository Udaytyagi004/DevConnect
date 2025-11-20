const validator = require("validator");

const signUpValidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please Enter a Valid name");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Email Id is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};
module.exports = {
  signUpValidation,
};
