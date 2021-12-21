'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_variant_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product_variant_details.init({
    product_id: DataTypes.INTEGER,
    product_variant_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    selling_price: DataTypes.DOUBLE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_variant_details',
  });
  return Product_variant_details;
};