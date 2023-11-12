const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Blog Backend!",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    tags: [
      {
        name: "Admin Functions",
        description: "These are only for special users!",
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
  },
  apis: [`${__dirname}/src/routes/*.js`],
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = { swaggerDocs };

// const swaggerAutogen = require('swagger-autogen')();

// const doc = {
//   info: {
//     title: 'Blog API',
//     description: 'Blog Backend'
//   },
//   host: 'localhost:3000'
// };

// const outputFile = './swagger-output.json';
// const routes = ['./index'];

// /* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
// root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// swaggerAutogen(outputFile, routes, doc);