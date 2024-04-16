const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");



const UserProfile = sequelize.define(
    "UserProfile",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
            //   isEmail: true,
            // }
          },
          phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
            //   is: /^[+][0-9]{10,12}$/
            // }
          },
        profile_picture_path: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'profiles',
        timestamps: false 
    }
);

module.exports = UserProfile;
