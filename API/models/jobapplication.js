'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobApplication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Advertisement, People}) {
      // define association here
    this.belongsTo(Advertisement, {foreignKey: "advertisementId", as: "advertisement"});
    this.belongsTo(People, {foreignKey: "peopleId", as: "people"});
    }
  }
  JobApplication.init({
    status: DataTypes.STRING,
    motivationLetter: DataTypes.STRING,
    advertisementId: DataTypes.INTEGER,
    peopleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JobApplication',
  });
  return JobApplication;
};