const Sequelize = require('sequelize')
const { sequelize } = require ('../db_connect')
const { createDefenderColumns } = require ('../columns')

const Defender = sequelize.define('Defender', createDefenderColumns(Sequelize))

module.exports = Defender