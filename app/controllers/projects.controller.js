const db = require("../models");
const Projects = db.projects;

exports.addNewProject = (req, res) => {
  // Save project to Database
  Projects.create({
    name: req.body.name,
  })
    .then((projects) => {
      projects.setUser(req.userId).then(() => {
        res.send({ message: "Project added successfully!" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.getProjectsByUserId = (req, res) => {
  return Projects.findAll({
    where: {
      userId: req.userId,
    },
  })
    .then((projects) => {
      if (!projects) {
        return res
          .status(404)
          .send({ message: "Currently you don't have any project!" });
      }
      res.status(200).send(projects);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.updateProject = (req, res) => {
  res.send({ message: "Project updated successfully!" });
  Projects.update({ name: req.body.name }, { where: { id: req.userId } })
    .then(() => {
      return res.status(200).send({ message: "Role Updated Succesfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.deleteProject = (req, res) => {
  res.send({ message: "Project deleted successfully!" });
};
