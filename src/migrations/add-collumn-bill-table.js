module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'bills',
        'openFeedback',
        {
          type: Sequelize.INTEGER
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('bills', 'openFeedback')
    ]);
  }
};