const bcrypt = require("bcrypt");

bcryptPassword = (password) => {
  return bcrypt.hash(password, 10);
};

comparePassword = async (inputPassword, userPassword) => {
  return await bcrypt.compare(inputPassword, userPassword);
};

module.exports = { bcryptPassword, comparePassword };
