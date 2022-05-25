// const { DataTypes } = require('sequelize/types')
// module.exports = {
//     up: async (queryInterface) => {
//         return Promise.all([
//             queryInterface.createTable("Defender", {
//                 nickname: DataTypes.STRING,
//                 attack_points_generated: DataTypes.INTEGER,
//                 defense_points_generated: DataTypes.INTEGER,
//                 tower: DataTypes.STRING
//             }),
//             queryInterface.createTable("Tower",{
//                 id: {
//                     type: DataTypes.INTEGER,
//                     allowNull: false,
//                     autoIncrement: true,
//                     primaryKey: true
//                 },
//                 health: DataTypes.INTEGER,
//                 defense: DataTypes,
//                 round: DataTypes.INTEGER,
//                 defender_count: DataTypes.INTEGER
//             }),
//             queryInterface.createTable("Round",{
//                 id: {
//                     type: DataTypes.INTEGER,
//                     allowNull: false,
//                     autoIncrement: true,
//                     primaryKey: true
//                 },
//                 time_created: DataTypes.DATE,
//                 global_defender_count: DataTypes.INTEGER,
//                 hocus_tower: DataTypes.STRING,
//                 pocus_tower: DataTypes.STRING
//             })
//         ]);
//     },
//
//     down: async (queryInterface) => {
//         return Promise.all ([
//         queryInterface.dropTable("Defender"),
//         queryInterface.dropTable("Tower"),
//         queryInterface.dropTable("Round")
//     ])
//     }
// }