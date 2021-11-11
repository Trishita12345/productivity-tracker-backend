const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      // user role = 1 when signUp
      user.setRole(1).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      user.getRole().then((role) => {
        var token = jwt.sign({ id: user.id, role: role.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateRole = (req, res) => {
  User.update(
    { roleId: req.roleId === 1 ? 2 : 1 },
    { where: { id: req.userId } }
  )
    .then(() => {
      return res.status(200).send({ message: "Role Updated Succesfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
