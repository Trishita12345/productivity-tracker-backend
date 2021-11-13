const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    req.roleId = decoded.role;
    next();
  });
};

const isPremium = (req, res, next) => {
  if (req.role === 2) {
    next();
    return;
  }
  res.status(403).send({
    message: "Require Premium Role!",
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isPremium: isPremium,
};
module.exports = authJwt;
