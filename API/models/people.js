'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Message, JobApplication}) {
      // define association here
      this.hasOne(JobApplication, {foreignKey: "peopleId", as: "jobapplication",  onDelete: "cascade", onUpdate: "cascade"});
      this.hasOne(Message, {foreignKey: "peopleId", as:" message",  onDelete: "cascade", onUpdate: "cascade"});
    }
  }
  People.init({
    name: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    CV: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'People',
  });
  return People;
};