module.exports = (sequelize, DataTypes) => {
  return sequelize.define("projects", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
