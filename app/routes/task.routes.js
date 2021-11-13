const { authJwt } = require("../middleware");
const controller = require("../controllers/task.controller");
const { API, TASK } = require("../common/constants");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //add new task
  app.post(`${API}${TASK}/add`, [authJwt.verifyToken], controller.addNewTask);

  //get tasks by projectId
  app.get(
    `${API}${TASK}/getByProjectId`,
    [authJwt.verifyToken],
    controller.getTasksByProjetctId
  );

  //update task
  app.put(`${API}${TASK}/update`, [authJwt.verifyToken], controller.updateTask);

  //delete task
  app.delete(
    `${API}${TASK}/delete`,
    [authJwt.verifyToken],
    controller.deleteTask
  );
};
