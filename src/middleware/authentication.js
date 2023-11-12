const { NotAuthorizedError } = require("../common/exception");
const { varifyJWT } = require("../common/jwt");
const UserService = require("../user/service");

module.exports = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  try {
    if (!bearerToken) throw new NotAuthorizedError();

    const token = bearerToken.split(" ")[1];
    if (!bearerToken) throw new NotAuthorizedError();
    const { id } = await varifyJWT(token);
    const userService = new UserService();
    const user = await userService.getUserById(id);
    req.User = user;
    next();
  } catch (e) {
    res.exception(e);
  }
};
