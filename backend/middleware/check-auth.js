const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret.secret);
    req.userData = {
      email: token.email,
      userId: token.userId,
      role: token.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "auth failed" });
  }
};
