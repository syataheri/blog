const UserService = require("./service");

const signupUser = async (req, res) => {
  try {
    const userService = new UserService();
    const user = await userService.signup(req.body);
    res.response({
      statusCode: 201,
      message: "Signup completed successfully, now you can login with it.",
      result: user,
    });
  } catch (error) {
    res.exception(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const userService = new UserService();
    const token = await userService.login(req.body);

    return res.response({
      statusCode: 200,
      message: "User successfully loged in.",
      result: {
        token,
      },
    });
  } catch (error) {
    res.exception(error);
  }
};

module.exports = { signupUser, loginUser };
