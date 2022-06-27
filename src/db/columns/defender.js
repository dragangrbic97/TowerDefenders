const DataTypes = require ('sequelize')

module.exports = () => ({
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
})