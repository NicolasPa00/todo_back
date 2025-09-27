import { DataTypes } from 'sequelize';
import sequelize from '../database/conection.js';

const Activity = sequelize.define('Activity', {
  title: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  description: DataTypes.TEXT,
  due_date: DataTypes.DATE,
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'activities',
  timestamps: true,          // usa createdAt y updatedAt
  underscored: true          // mapea created_at en la DB
});

export default Activity;
