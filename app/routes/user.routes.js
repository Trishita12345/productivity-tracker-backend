const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/basic",
    [authJwt.verifyToken, authJwt.isBasic],
    controller.basicBoard
  );

  app.get(
    "/api/test/premium",
    [authJwt.verifyToken, authJwt.isPremium],
    controller.premiumBoard
  );
};
