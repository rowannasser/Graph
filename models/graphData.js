const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const GraphData = sequelize.define('graph_data', {
  source_node: {
    type: DataTypes.STRING,
    allowNull: false
  },
  version: {
    type: DataTypes.STRING,
    allowNull: false
  },
  target_node: {
    type: DataTypes.STRING,
    allowNull: false
  },
  left_shift: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  top_shift: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false // Disable timestamps
});

module.exports = GraphData;