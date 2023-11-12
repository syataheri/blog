const { gql } = require("graphql-request");

const { client } = require("../common/client");
const { ServerError } = require("../common/exception");
class PostRepo {
  async createPost(postData) {
    try {
      const { insert_blog_posts_one } = await client.request(
        gql`
          mutation createPost($user: blog_posts_insert_input!) {
            insert_blog_posts_one(object: $user) {
              id
              title
              body
            }
          }
        `,
        {
          user: {
            ...postData,
          },
        }
      );
      return insert_blog_posts_one;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
  async getUserPosts(userId) {
    try {
      const { blog_posts } = await client.request(
        gql`
          query getPosts($userId: Int!) {
            blog_posts(where: { userId: { _eq: $userId } }) {
              id
              title
              body
            }
          }
        `,
        {
          userId,
        }
      );
      return blog_posts;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getPostById(id) {
    try {
      let { blog_posts } = await client.request(
        gql`
          query getPosts($id: Int!) {
            blog_posts(where: { id: { _eq: $id } }) {
              id
              title
              body
              userId
            }
          }
        `,
        {
          id,
        }
      );
      return blog_posts[0];
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async updatePost({ postId, postData }) {
    try {
      const { update_blog_posts_by_pk } = await client.request(
        gql`
          mutation updatePost($id: Int!, $changes: blog_posts_set_input) {
            update_blog_posts_by_pk(pk_columns: { id: $id }, _set: $changes) {
              id
              title
              body
            }
          }
        `,
        {
          id: postId,
          changes: postData,
        }
      );
      return update_blog_posts_by_pk;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  deletePostById(id) {
    try {
      return client.request(
        gql`
          mutation DeletePost($id: Int!) {
            delete_blog_posts_by_pk(id: $id) {
              id
            }
          }
        `,
        {
          id,
        }
      );
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
}

module.exports = PostRepo;
