const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('graph_data', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;