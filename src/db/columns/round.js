const DataTypes = require ('sequelize')

module.exports = () => ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    time_created: DataTypes.DATE,
    global_defender_count: {
        type: DataTypes.SMALLINT,
        defaultValue: 0
    },
    hocus_tower: DataTypes.INTEGER,
    pocus_tower: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
})