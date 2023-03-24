'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.Authority, {foreignKey: "idAuth", as: "AuthData"});
      Account.hasMany(models.Bill, {foreignKey: "idAcc", as:"DataAcc"});
      // define association here
    }
  };
  Account.init({
    idAuth: DataTypes.INTEGER,
    nameAcc: DataTypes.STRING,
    emailAcc: DataTypes.STRING,
    passwordAcc: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};