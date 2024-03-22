
const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "Route not found" });
  return next();
};


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
