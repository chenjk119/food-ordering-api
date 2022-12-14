const jwt = require("jsonwebtoken");

const config = process.env;

/**
 * Verifies the token
 */
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(parseInt(config.FORBIDDEN, 10)).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(parseInt(config.UNAUTHORIZED, 10)).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;