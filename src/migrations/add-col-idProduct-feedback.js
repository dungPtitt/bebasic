module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'feedbacks',
        'idProduct',
        {
          type: Sequelize.INTEGER
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('feedbacks', 'idProduct')
    ]);
  }
};