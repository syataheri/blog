const express = require("express");

const routes = express.Router();

const validation = require("../middleware/validation");
const validationSchmema = require("../middleware/validationSchmema");
const postController = require("../controllers/post");

/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: Create a new post.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *             example:
 *               title: "swagger title"
 *               body: "this is a swagger body"
 *     responses:
 *       201:
 *         description: Post successfully created.
 *       406:
 *         description: |
 *          - Title/body should be type of string.
 *          - Title/body is required.
 *          - Title/body should be more than 2/10 characters.
 *          - Title/body should be less than 61/801 character.
 *       401:
 *         description: |
 *          - Token is required.
 *          - Token not valid.
 */
routes.post(
  "/",
  validation(validationSchmema.createPost, "body"),
  async (req, res) => {
    postController.createPost(req, res);
  }
);

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Get a post by id.
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Post successfully returned.
 *       406:
 *         description: Id is not valid
 *       403:
 *         description: You can not access this post.
 *       401:
 *         description: |
 *          - Token is required.
 *          - Token not valid.
 */
routes.get("/:id", async (req, res) => {
  postController.getPost(req, res);
});

/**
 * @swagger
 * /api/post/:
 *   get:
 *     summary: Get user posts.
 *     responses:
 *       200:
 *         description: User posts successfully returned.
 *       401:
 *         description: |
 *          - Token is required.
 *          - Token not valid.
 */
routes.get("/", async (req, res) => {
  postController.getPosts(req, res);
});

/**
 * @swagger
 * /api/post/{id}:
 *   put:
 *     summary: Update a post.
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *             example:
 *               title: "swagger title"
 *               body: "this is a swagger body"
 *     responses:
 *       201:
 *         description: Post successfully updated.
 *       406:
 *         description: |
 *          - Title/body should be type of string.
 *          - Title/body should be more than 2/10 characters.
 *          - Title/body should be less than 61/801 character.
 *       401:
 *         description: |
 *          - Token is required.
 *          - Token not valid.
 */
routes.put(
  "/:id",
  validation(validationSchmema.updatePost, "body"),
  async (req, res) => {
    postController.updatePost(req, res);
  }
);

/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     summary: Delete a post by id.
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Post successfully deleted.
 *       406:
 *         description: Id is not valid
 *       403:
 *         description: You can not access this post.
 *       401:
 *         description: |
 *          - Token is required.
 *          - Token not valid.
 */
routes.delete("/:id", async (req, res) => {
  postController.deletePost(req, res);
});

module.exports = routes;
