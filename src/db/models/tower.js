const Sequelize = require('sequelize')
const { sequelize } = require ('../db_connect')
const DataTypes = require('sequelize')

const Tower = sequelize.define('tower', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        health: {
            type: DataTypes.INTEGER,
            defaultValue: 5000
        },
        defense: {
            type: DataTypes.INTEGER,
            defaultValue: 2000
        },
        defender_count: {
            type: DataTypes.SMALLINT,
            defaultValue: 0
        }
    },
    {freezeTableName: true});

module.exports = Tower