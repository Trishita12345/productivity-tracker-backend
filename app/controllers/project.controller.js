const db = require("../models");
const Project = db.project;

exports.addNewProject = (req, res) => {
  // Save project to Database
  Project.create({
    name: req.body.name,
  })
    .then((project) => {
      project.setUser(req.userId).then(() => {
        res.send({ message: "Project added successfully!" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.getProjectsByUserId = (req, res) => {
  return Project.findAll({
    where: {
      userId: req.userId,
    },
  })
    .then((project) => {
      if (!project) {
        return res
          .status(404)
          .send({ message: "Currently you don't have any project!" });
      }
      res.status(200).send(project);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.updateProject = (req, res) => {
  Project.update(
    {
      name: req.body.name,
    },
    { where: { id: req.body.id } }
  )
    .then((project) => {
      res.status(200).send({ message: "Project Updated Succesfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.deleteProject = (req, res) => {
  Project.destroy({ where: { id: req.body.id }, force: true })
    .then(() => {
      res.status(200).send({ message: "Project Deleted Succesfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
