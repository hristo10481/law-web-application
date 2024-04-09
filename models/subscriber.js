
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const Subscriber = sequelize.define('Subscriber', {
  // Моделни атрибути
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    // validate: {
    //   isEmail: true,
    // }
  }
}, {

    tableName: 'subscribers', // Изрично посочваме името на таблицата
        timestamps: false // Изключваме автоматичното създаване на полетата "createdAt" и "updatedAt"
});

module.exports = Subscriber;
