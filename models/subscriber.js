
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const Subscriber = sequelize.define('Subscriber', {
  
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    // validate: {
    //   isEmail: true,
    // }
  }
}, {

    tableName: 'subscribers', 
        timestamps: false 
});

module.exports = Subscriber;
