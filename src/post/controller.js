const PostService = require("./service");
const { sendMail } = require("./utils");

const createPost = async (req, res) => {
  try {
    const postService = new PostService();
    const result = await postService.createPost({
      userId: req.User.id,
      ...req.body,
    });

    sendMail(
      req.User.email,
      `New Post: ${req.body.title}`,
      "New Post Created Successfully"
    );

    return res.response({
      statusCode: 201,
      message: "Post successfully created.",
      result,
    });
  } catch (error) {
    res.exception(error);
  }
};

async function getPosts(req, res) {
  try {
    const postService = new PostService();
    const result = await postService.getUserPosts(req.User.id);

    res.response({
      statusCode: 200,
      message: "User posts successfully returned.",
      result,
    });
  } catch (error) {
    res.exception(error);
  }
}

async function getPost(req, res) {
  try {
    const postService = new PostService();
    const result = await postService.getSinglePost({
      postId: req.params.id,
      userId: req.User.id,
    });
    const { id, title, body } = result;
    res.response({
      statusCode: 200,
      message: "Post successfully returned.",
      result: { id, title, body },
    });
  } catch (error) {
    res.exception(error);
  }
}

async function updatePost(req, res) {
  try {
    const postService = new PostService();
    const result = await postService.updatePost({
      postData: req.body,
      postId: req.params.id,
      userId: req.User.id,
    });
    res.response({
      statusCode: 201,
      message: "Post successfully updated.",
      result,
    });
  } catch (error) {
    res.exception(error);
  }
}

async function deletePost(req, res) {
  try {
    const postService = new PostService();
    const result = await postService.getSinglePost({
      postId: req.params.id,
      userId: req.User.id,
    });
    
    res.response({
      statusCode: 200,
      message: "Post successfully deleted.",
    });
  } catch (error) {
    res.exception(error);
  }
}
module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
