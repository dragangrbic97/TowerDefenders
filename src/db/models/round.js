const Sequelize = require('sequelize')
const { sequelize } = require ('../db_connect')
const { createRoundColumns } = require ('../columns')

const Round = sequelize.define('Round', createRoundColumns(Sequelize))

module.exports = Round