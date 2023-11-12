const { gql } = require("graphql-request");

const { client } = require("../common/client");
const { ServerError } = require("../common/exception");
class UserRepo {
  async createUser(user) {
    try {
      const { insert_blog_users_one } = await client.request(
        gql`
          mutation registerUser($user: blog_users_insert_input!) {
            insert_blog_users_one(object: $user) {
              id
              name
              email
            }
          }
        `,
        {
          user: {
            email: user.email,
            name: user.name,
            password: user.password,
          },
        }
      );
      return insert_blog_users_one;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getUserByEmail(email) {
    try {
      const { blog_users } = await client.request(
        gql`
          query getUserByEmail($email: String!) {
            blog_users(where: { email: { _eq: $email } }) {
              id
              password
            }
          }
        `,
        { email }
      );

      return blog_users[0];
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getUserById(id) {
    try {
      const { blog_users } = await client.request(
        gql`
          query getUserById($id: Int!) {
            blog_users(where: { id: { _eq: $id } }) {
              id
              email
              name
            }
          }
        `,
        { id }
      );
      return blog_users[0];
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async deleteUserById(id) {
    try {
      await client.request(
        gql`
          mutation DeleteUser($id: Int!) {
            delete_blog_users_by_pk(id: $id) {
              id
            }
          }
        `,
        {
          id: Number(id),
        }
      );
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
}

module.exports = UserRepo;
