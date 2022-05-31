const DataTypes = require ('sequelize')

module.exports = () => ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    health: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    round: DataTypes.INTEGER,
    defender_count: DataTypes.INTEGER
})