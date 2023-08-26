const isUserVerified = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "unauthorized",
    });
  } else {
    next();
  }
};

module.exports = {
  isUserVerified,
};
