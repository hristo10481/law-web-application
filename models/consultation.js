// models/consultation.js

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Consultation = sequelize.define('consultation', {
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        

            references: {
                model: 'users',
                tableName: 'users',
                key: 'id',
              }
        
    },
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    inquiry: Sequelize.STRING,
    additional_info: Sequelize.TEXT,
    consent: Sequelize.BOOLEAN
}, {
    timestamps: false 
});


module.exports = Consultation;
