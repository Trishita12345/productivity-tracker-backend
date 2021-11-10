module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return User;
};
