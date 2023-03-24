'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAuth: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nameAcc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      emailAcc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passwordAcc: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};