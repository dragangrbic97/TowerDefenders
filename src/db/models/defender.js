const db = require('../db_connect')
sequelize = db.sequelize
Sequelize = db.Sequelize
const DataTypes = require('sequelize')

const Defender = sequelize.define('defender', {
    nickname: {
        type: DataTypes.STRING(32),
        unique: true,
        allowNull: false
    },
    attack_points_generated: DataTypes.INTEGER,
    defense_points_generated: DataTypes.INTEGER,
    tower: DataTypes.STRING(32),
    tower_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
    },
    {freezeTableName: true});

module.exports = Defender