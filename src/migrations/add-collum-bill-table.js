module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'bills',
        'idP',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'bills',
        'quantityP',
        {
          type: Sequelize.INTEGER
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('bills', 'idP'),
      queryInterface.removeColumn('bills', 'quantityP')
    ]);
  }
};