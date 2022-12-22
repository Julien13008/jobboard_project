'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({People, Advertisement}) {
      // define association here
      this.belongsTo(People, {foreignKey: "peopleId", as: "people"});
      this.belongsTo(Advertisement, {foreignKey: "advertisementId", as: "advertisement"});
    }
  }
  Favori.init({
    peopleId: DataTypes.INTEGER,
    advertisementId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Favori',
  });
  return Favori;
};