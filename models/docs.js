const Sequelize = require('sequelize');
const db = require('../config/db'); // Предполага се, че имате настроена база данни

const Document = db.define('document', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true // Полето е задължително
    },
    path: {
        type: Sequelize.STRING,
        allowNull: true // Полето е задължително
    },
    imagePath: {
        type: Sequelize.STRING,
        allowNull: true // Позволява NULL стойности, в случай че документът не е свързан с изображение
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true // Описание на документа, може да бъде NULL
    }
}, {
    tableName: 'documents',
    timestamps: false
});


module.exports = Document;