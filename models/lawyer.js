

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Lawyer = sequelize.define('lawyers', {

    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    specialization: Sequelize.STRING,
    profilePicturePath: Sequelize.STRING
}, {
    timestamps: false
});


module.exports = Lawyer;
