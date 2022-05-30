const DataTypes = require ('sequelize')
module.exports = () => ({
    nickname: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    attack_points_generated: DataTypes.INTEGER,
    defense_points_generated: DataTypes.INTEGER,
    tower: DataTypes.STRING
})