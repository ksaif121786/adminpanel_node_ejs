'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category}) {
      // define association here
      this.hasOne(Category,{sourceKey:'category_id',foreignKey:'id',as:'category'});
    }
  };
  Subcategory.init({
    image:DataTypes.STRING,
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subcategory',
    tableName:'subcategories'
  });
  return Subcategory;
};