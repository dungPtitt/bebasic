'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('detailBills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idBill: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idP: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      quantityP: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      totalCost: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('detailBills');
  }
};