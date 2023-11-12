const UserRepo = require("./repo");
const {
  EmailDuplicateError,
  EmailOrPasswordWrongError,
} = require("../common/exception");
const { generateJWT } = require("../common/jwt");
const { bcryptPassword, comparePassword } = require("./utils");

class UserService {
  async signup(userData) {
    const userRepo = new UserRepo();
    let user = await userRepo.getUserByEmail(userData.email);
    if (user) throw new EmailDuplicateError();
    userData.password = await bcryptPassword(userData.password);
    user = await userRepo.createUser(userData);
    return { id: user.id, name: user.name, email: user.email };
  }

  async login(userData) {
    const userRepo = new UserRepo();
    let user = await userRepo.getUserByEmail(userData.email);
    if (user) {
      const passwordMatch = await comparePassword(
        userData.password,
        user.password
      );

      if (passwordMatch) {
        return generateJWT({
          defaultRole: "user",
          allowedRoles: ["user"],
          otherClaims: {
            "X-Hasura-User-Id": user.id,
          },
        });
      }
    }
    throw new EmailOrPasswordWrongError();
  }

  getUserById(userId) {
    const userRepo = new UserRepo();
    return userRepo.getUserById(userId);
  }

  deleteUser(id) {
    const userRepo = new UserRepo();
    return userRepo.deleteUserById(id);
  }
}

module.exports = UserService;
