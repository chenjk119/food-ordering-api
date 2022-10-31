'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * Creates table histories in the database
   */
  const History = sequelize.define('History', {
    influencerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    size: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  });

  /**
   * Connects table histories with table users
   */
  History.associate = (models) => {
    History.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return History;
};