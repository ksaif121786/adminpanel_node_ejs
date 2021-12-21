'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_variants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      variant_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price_type: {
        type: Sequelize.INTEGER,
        comment:"0=>single rate for all variants,1=>individual rate",
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE(10,2),
        allowNull: false,
      },
      is_deleted: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_variants');
  }
};