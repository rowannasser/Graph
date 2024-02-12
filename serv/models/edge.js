const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Edge = sequelize.define('edge', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  version: {
    type: DataTypes.DATE,
    allowNull: false
  },
  source_node_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
      model: 'nodes',
      key: 'id'
    }
  },
    target_node_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nodes',
        key: 'id'
      }
    }
  }, {
    timestamps: false // Disable timestamps
});

module.exports = Edge;