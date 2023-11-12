const express = require("express");

const routes = express.Router();

const validation = require("../middleware/validation");
const validationSchmema = require("./validationSchema");
const authController = require("./controller");

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Signup a new user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: "sya"
 *               email: "sya@gmail.com"
 *               password: "sya12346"
 *     responses:
 *       201:
 *         description: User successfully signed in, now you can login with it.
 *       406:
 *        description: |
 *         - Name/email/password should be type of string.
 *         - Name/password should be more than 1/6 characters.
 *         - Name/email/password is required.
 *         - Entered email is not valid.
 *         - Name/password should be less than 31/13 characters.
 *       409:
 *         description: Email already exists.
*/
routes.post(
  "/signup",
  validation(validationSchmema.signup, "body"),
  async (req, res) => {
    authController.signupUser(req, res);
  }
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: objetc
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "sya@gmail.com"
 *               password: "sya12346"
 *     responses:
 *       200:
 *         description: User successfully loged in.
 *       406:
 *         description: |
 *          - Email or password is wrong.
 *          - Email/pawword should be type of string.
 *          - Email/password is required.
 *          - Password should be more than 6 character.
 *          - Password should be less than 13 character.
*/
routes.post(
  "/login",
  validation(validationSchmema.login, "body"),
  async (req, res) => {
    authController.loginUser(req, res);
  }
);

module.exports = routes;