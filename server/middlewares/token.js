const jwt = require("jsonwebtoken");
const generateToken = async (user) => {
  const accessToken = jwt.sign(
    { id: user.sub, email: user.email },
    process.env.ACCESS_TOKEN_JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_JWT_EXPIRATION,
    }
  );
  return { accessToken };
};

const verifyToken = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !(bearerToken.search("Bearer ") === 0)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = bearerToken.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_JWT_SECRET);
  if (!decoded) return res.status(401).json({ error: "Unauthorized" });
  req.user = decoded;
  return next();
};

module.exports = { generateToken, verifyToken };
