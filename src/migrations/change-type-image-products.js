module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('products', 'imageP', {
              type: Sequelize.TEXT,
              allowNull: true,
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('products', 'imageP', {
              type: Sequelize.STRING,
              allowNull: true,
          })
      ])
  }
};