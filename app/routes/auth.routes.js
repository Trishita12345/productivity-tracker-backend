const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { API, AUTH } = require("../common/constants");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //SignUp
  app.post(
    `${API}${AUTH}/signup`,
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );

  //SignIn
  app.post(`${API}${AUTH}/signin`, controller.signin);

  //Update Role
  app.put(
    `${API}${AUTH}/updateRole`,
    [authJwt.verifyToken],
    controller.updateRole
  );
};
