module.exports = (sequelize, DataTypes) => {
  return sequelize.define("roles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
