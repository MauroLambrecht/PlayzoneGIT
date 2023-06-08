const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secret);
    req.userData = { email: decodedToken.email, IDUser: decodedToken.IDUser };
    next();
  } catch (error) {
    console.log("error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};
