const PostRepo = require("./repo");
const { PostNotFoundError, ForbiddenError } = require("../common/exception");

class PostService {
  async createPost(postData) {
    const postRepo = new PostRepo();
    return postRepo.createPost(postData);
  }

  async getUserPosts(userId) {
    const postRepo = new PostRepo();
    return postRepo.getUserPosts(userId);
  }

  async getSinglePost({ postId, userId }) {
    const postRepo = new PostRepo();
    const post = await postRepo.getPostById(postId);
    await this._checkAccess(post, userId);
    return post;
  }

  async updatePost({ postData, postId, userId }) {
    const postRepo = new PostRepo();
    let post = await postRepo.getPostById(postId);
    await this._checkAccess(post, userId);
    post = await postRepo.updatePost({ postData, postId });
    return post;
  }


  async deletePost({ postId, userId }) {
    const postRepo = new PostRepo();
    const post = await postRepo.getPostById(postId);
    await this._checkAccess(post, userId);
    await postRepo.deletePostById(postId);
    return;
  }

  async _checkAccess(post, userId) {
    if (!post) {
      throw new PostNotFoundError();
    }
    if (post.userId !== userId) {
      throw new ForbiddenError();
    }
  }
}

module.exports = PostService;
