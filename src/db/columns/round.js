const DataTypes = require ('sequelize')

module.exports = () => ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    time_created: DataTypes.DATE,
    global_defender_count: DataTypes.INTEGER,
    hocus_tower: DataTypes.ENUM('one','two'),
    pocus_tower: DataTypes.ENUM('one','two')
})