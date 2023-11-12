const jwt = require("jsonwebtoken");

const { NotAuthorizedError } = require("../common/exception");

const HASURA_GRAPHQL_JWT_SECRET = {
  type: process.env.HASURA_JWT_SECRET_TYPE || "HS256",
  key:
    process.env.HASURA_JWT_SECRET_KEY ||
    "this-is-a-generic-HS256-secret-key-and-you-should-really-change-it",
};

const JWT_CONFIG = {
  algorithm: HASURA_GRAPHQL_JWT_SECRET.type,
  expiresIn: "10h",
};

const generateJWT = (params) => {
  const payload = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": params.allowedRoles,
      "x-hasura-default-role": params.defaultRole,
      ...params.otherClaims,
    },
  };
  return jwt.sign(payload, HASURA_GRAPHQL_JWT_SECRET.key, JWT_CONFIG);
};

const varifyJWT = (token) => {
  return jwt.verify(token, HASURA_GRAPHQL_JWT_SECRET.key, (err, decoded) => {
    if (err) {
      throw new NotAuthorizedError();
    } else {
      if (decoded && decoded["https://hasura.io/jwt/claims"]) {
        const hasuraClaims = decoded["https://hasura.io/jwt/claims"];
        return { id: hasuraClaims["X-Hasura-User-Id"] };
      } else {
        throw new NotAuthorizedError();
      }
    }
  });
};

module.exports = { generateJWT, varifyJWT };
