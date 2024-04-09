// models/consultation.js


const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Consultation = sequelize.define('consultation', {
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    inquiry: Sequelize.STRING,
    additional_info: Sequelize.TEXT,
    consent: Sequelize.BOOLEAN
}, {
    timestamps: false // Изключва автоматичното генериране на createdAt и updatedAt
});


module.exports = Consultation;
