const DataTypes = require ('sequelize')

module.exports = () => ({
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
})