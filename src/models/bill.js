'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bill.belongsTo(models.Account, {foreignKey: "idAcc", as: "DataAccAndBill"});
      Bill.hasOne(models.DetailBill, {foreignKey: "idBill", as: "DataBill"});
      // Bill.belongsToMany(models.Product, {foreignKey: "idP", as:"DataProduct", through: "BillAndProduct"});
      Bill.belongsTo(models.Product, {foreignKey: "idP", as: "DataProductOfBill"});
    }
  };
  Bill.init({
    idAcc: DataTypes.INTEGER,
    nameCustomer: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    dateBill: DataTypes.DATE,
    totalMoney: DataTypes.INTEGER,
    methodPay: DataTypes.STRING,
    noteBill: DataTypes.STRING,
    statusBill: DataTypes.STRING,
    idP: DataTypes.STRING,
    quantityP: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bill',
    tableName: 'bills'
  });
  return Bill;
};