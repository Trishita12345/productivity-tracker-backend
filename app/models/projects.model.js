module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define("projects", {
    name: {
      type: DataTypes.STRING,
    },
  });

  return Projects;
};
