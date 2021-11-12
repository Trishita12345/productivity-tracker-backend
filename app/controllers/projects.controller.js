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
  res.send({ message: "getProjectsByUserId" });
};
exports.updateProject = (req, res) => {
  res.send({ message: "Project updated successfully!" });
};
exports.deleteProject = (req, res) => {
  res.send({ message: "Project deleted successfully!" });
};
