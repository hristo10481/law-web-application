const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class ConsultationRequest extends Model {}

ConsultationRequest.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'profiles',
      tableName: 'profiles',
      key: 'id',
    }
  },
  
  lawyerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'lawyers',
      tableName: 'lawyers',
      key: 'id',
    }
  },
  appointmentDateTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'pending' 
  }
}, {
  sequelize,
  modelName: 'ConsultationRequest',
  tableName: 'consultationrequest',
  timestamps: false
});

module.exports = ConsultationRequest;
