
// Handling non-existing routes
const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "Route not found" });
  return next();
};


// This overrides the default error handler to return a json response
const defaultErrorHandler = (error, req, res) => {
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message,
  });
  return;
};

module.exports = {
  unknownEndpoint,
  defaultErrorHandler,
};
