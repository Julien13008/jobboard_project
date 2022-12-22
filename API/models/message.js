'use strict';
const {
  Model
} = require('sequelize');
const {Company} = require("./company");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({People, Company, Advertisement}) {
      // define association here
      this.belongsTo(People, {foreignKey: "peopleId", as: "people"});
      this.belongsTo(Company, {foreignKey: "companyId", as: "company"});
      this.belongsTo(Advertisement, {foreignKey: "advertisementId", as: "advertisement"})
    }
  }
  Message.init({
    message: DataTypes.STRING,
    peopleId: DataTypes.INTEGER,
    sender: DataTypes.ENUM('Company', 'People'),
    companyId: DataTypes.INTEGER,
    advertisementId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};