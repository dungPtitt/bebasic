module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('bills', 'dateBill', {
              type: Sequelize.DATEONLY,
              allowNull: false,
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('bills', 'dateBill', {
              type: Sequelize.DATE,
              allowNull: false,
          })
      ])
  }
};