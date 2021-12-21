'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product_variant.init({
    product_id: DataTypes.INTEGER,
    variant_name: DataTypes.STRING,
    price_type: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_variant',
    tableName:'product_variants'
  });
  return Product_variant;
};