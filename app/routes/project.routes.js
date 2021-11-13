const { authJwt } = require("../middleware");
const controller = require("../controllers/project.controller");
const { API, PROJECT } = require("../common/constants");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //add new project
  app.post(
    `${API}${PROJECT}/add`,
    [authJwt.verifyToken],
    controller.addNewProject
  );

  //get project by userId
  app.get(
    `${API}${PROJECT}/getByUserId`,
    [authJwt.verifyToken],
    controller.getProjectsByUserId
  );

  //update project
  app.put(
    `${API}${PROJECT}/update`,
    [authJwt.verifyToken],
    controller.updateProject
  );

  //delete project
  app.delete(
    `${API}${PROJECT}/delete`,
    [authJwt.verifyToken],
    controller.deleteProject
  );
};
