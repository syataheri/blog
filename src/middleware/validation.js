const HandleException = require("../common/exception");

const validation = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((eM) => eM.message).join(",");
      const e = {};
      e.statusCode = 406;
      e.message = message;
      res.exception(e);
    }
  };
};
module.exports = validation;
