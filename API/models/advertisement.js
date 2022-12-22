'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Company, Favori, JobApplication, Message}) {
      // define association here
      this.belongsTo(Company, {foreignKey: "companyId", as: "company"});
      this.hasOne(Favori, {foreignKey: "advertisementId", as: "favori", onDelete: "cascade", onUpdate: "cascade"});
      this.hasOne(JobApplication, {foreignKey: "advertisementId", as: "jobapplication",  onDelete: "cascade", onUpdate: "cascade"});
      this.hasOne(Message, {foreignKey: "advertisementId", as: "message",  onDelete: "cascade", onUpdate: "cascade"});
    }
  }
  Advertisement.init({
    title: DataTypes.STRING,
    experience: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    type: DataTypes.STRING,
    remote: DataTypes.BOOLEAN,
    salarie: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    isPartTime: DataTypes.BOOLEAN,
    companyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Advertisement',
  });

  return Advertisement;
};