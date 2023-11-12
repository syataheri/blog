const successResponse = (req, res) => {
  res.response = function ({
    statusCode = 200,
    status = true,
    message,
    result,
  } = {}) {
    this.status(statusCode || 200).json({
      success: status,
      message: message ,
      response: result || null,
    });
  };
};

const errorResponse = (req, res) => {
  res.exception = function (errorData) {
    this.status(errorData?.statusCode || 500).json({
      success: false,
      message: errorData?.message || errorData || "Error happend in server side" ,
      response: errorData?.response || null,
    });
  };
};

module.exports = (req, res, next) => {
  successResponse(req, res);
  errorResponse(req, res);
  next();
};
