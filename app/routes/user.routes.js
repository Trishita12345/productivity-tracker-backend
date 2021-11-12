const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { API, USER } = require("../common/constants");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(`${API}${USER}/all`, controller.allAccess);

  //isbasic
  app.get(`${API}${USER}/basic"`, [authJwt.verifyToken], controller.basicBoard);

  //isPremium
  app.get(
    `${API}${USER}/premium`,
    [authJwt.verifyToken, authJwt.isPremium],
    controller.premiumBoard
  );
};
