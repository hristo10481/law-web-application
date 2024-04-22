// ../connfig/db.js
const { Sequelize } = require("sequelize");
let sequelize = new Sequelize({
  logging: false,
  dialect: "mysql",
  database: "diplom",
  host: "localhost",
  username: "root",
  password: "",
  define: { freezeTableName: true },
});

module.exports = sequelize;
