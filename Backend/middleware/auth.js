const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Unauthorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "key");
    console.log("Decoded Token:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized, invalid token" });
  }
};

exports.admin = (req, res, next) => {
  console.log("User role in admin middleware:", req.user.role);

  if (!req.user || !req.user.role) {
    return res.status(403).send({ msg: "Access Denied! No user role found." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).send({ msg: "Access Denied! Admins only." });
  }

  next();
};
