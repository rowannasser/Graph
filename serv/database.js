const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('graph_data', 'toka', '42Tt&41#', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;