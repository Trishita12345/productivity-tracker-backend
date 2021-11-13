module.exports = (sequelize, DataTypes) => {
  return sequelize.define("tasks", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: "TODO",
      values: ["TODO", "INPROGRESS", "COMPLETED"],
    },
  });
};
