const Sequelize = require('sequelize')
const { sequelize } = require ('../db_connect')
const { createTowerColumns } = require ('../columns')

const Tower = sequelize.define('Tower', createTowerColumns(Sequelize))

module.exports = Tower