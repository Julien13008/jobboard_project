'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Message, Advertisement}) {
      // define association here
      this.hasMany(Advertisement, {foreignKey: "companyId", as: "advertisement",  onDelete: "cascade", onUpdate: "cascade"})
      this.hasMany(Message, {foreignKey: "companyId", as: "message",  onDelete: "cascade", onUpdate: "cascade"});
    }
  }
  Company.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    logo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};