const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Node = sequelize.define('node', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    left_coordinate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    top_coordinate: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, {
        timestamps: false // Disable timestamps
});

module.exports = Node;