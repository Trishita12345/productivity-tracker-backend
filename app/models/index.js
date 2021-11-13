const config = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, DataTypes);
db.role = require("../models/role.model.js")(sequelize, DataTypes);
db.project = require("./project.model.js")(sequelize, DataTypes);
db.task = require("./task.model.js")(sequelize, DataTypes);

// 1:1 :: user:role
db.user.belongsTo(db.role);
db.role.hasOne(db.user);

// 1:n :: user:project
db.user.hasMany(db.project, { onDelete: "CASCADE" });
db.project.belongsTo(db.user);

// 1:n :: project:task
db.project.hasMany(db.task, { onDelete: "CASCADE" });
db.task.belongsTo(db.project);

// && n:1 :: task:user
db.task.belongsTo(db.user);
db.user.hasMany(db.task);

db.ROLES = ["basic", "premium"];
module.exports = db;
