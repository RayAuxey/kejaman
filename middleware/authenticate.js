const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader.split(" ")[1] || req.query.token;

  if (!token) {
    return res.status(403).send("Please provide token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authenticate;
