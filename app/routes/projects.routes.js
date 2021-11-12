const { authJwt } = require("../middleware");
const controller = require("../controllers/projects.controller");
const { API, PROJECTS } = require("../common/constants");

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
    `${API}${PROJECTS}/add`,
    [authJwt.verifyToken],
    controller.addNewProject
  );

  //get project by userId
  app.get(
    `${API}${PROJECTS}/getByUserId`,
    [authJwt.verifyToken],
    controller.getProjectsByUserId
  );

  //update project
  app.put(
    `${API}${PROJECTS}/update`,
    [authJwt.verifyToken],
    controller.updateProject
  );

  //delete project
  app.delete(
    `${API}${PROJECTS}/delete`,
    [authJwt.verifyToken],
    controller.deleteProject
  );
};
