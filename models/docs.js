const Sequelize = require('sequelize');
const db = require('../config/db'); 

const Document = db.define('document', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    path: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    imagePath: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true 
    }
}, {
    tableName: 'documents',
    timestamps: false
});


module.exports = Document;