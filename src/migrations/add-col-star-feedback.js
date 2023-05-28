module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'feedbacks',
        'star',
        {
          type: Sequelize.INTEGER
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('feedbacks', 'star')
    ]);
  }
};