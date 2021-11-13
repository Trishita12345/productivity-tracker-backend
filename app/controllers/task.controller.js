const db = require("../models");
const Task = db.task;

exports.addNewTask = (req, res) => {
  // Save Task to Database
  Task.create({
    title: req.body.title,
    description: req.body.description ?? "",
  })
    .then((task) => {
      task.setProject(req.body.projectId).then(() => {
        res.send({ message: "Task added successfully!" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.getTasksByProjetctId = (req, res) => {
  Task.findAll({
    where: {
      projectId: req.body.projectId,
    },
  })
    .then((tasks) => {
      if (!tasks) {
        return res
          .status(404)
          .send({ message: "Currently this project doesn't have any Task!" });
      }
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.updateTask = (req, res) => {
  Task.update(
    {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      userId: req.body.userId,
    },
    { where: { id: req.body.id } }
  )
    .then((task) => {
      res.status(200).send({ message: "Task Updated Succesfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.deleteTask = (req, res) => {
  Task.destroy({ where: { id: req.body.id }, force: true })
    .then(() => {
      res.status(200).send({ message: "Task Deleted Succesfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
