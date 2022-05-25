'use strict';
const { DataTypes } = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable("Defender", {
        nickname: DataTypes.STRING,
        attack_points_generated: DataTypes.INTEGER,
        defense_points_generated: DataTypes.INTEGER,
        tower: DataTypes.STRING
      }),
      queryInterface.createTable("Tower",{
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
      }),
      queryInterface.createTable("Round",{
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
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all ([
      queryInterface.dropTable("Defender"),
      queryInterface.dropTable("Tower"),
      queryInterface.dropTable("Round")
    ])
  }
};
