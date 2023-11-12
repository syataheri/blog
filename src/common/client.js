const { GraphQLClient } = require("graphql-request");

const client = new GraphQLClient(
  process.env.HASURA_URL,
  {
    headers: {
      "x-hasura-admin-secret":
        process.env.HASURA_ADMIN_SECRET,
    },
  }
);

module.exports = { client };
