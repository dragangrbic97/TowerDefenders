const db = require('../db_connect')
sequelize = db.sequelize
Sequelize = db.Sequelize
const DataTypes = require('sequelize')

const Defender = sequelize.define('defender', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING(32),
        unique: true,
        allowNull: false
    },
    attack_points_generated: DataTypes.INTEGER,
    defense_points_generated: DataTypes.INTEGER,
    tower: DataTypes.STRING(32),
    tower_id: DataTypes.INTEGER
    },
    {freezeTableName: true});

module.exports = Defender