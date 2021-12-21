'use strict';
var faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    var dummyCategory =[
      {
        image:'/category/default.png' ,
        name:"Electronic", 
      },
      {
        image:'/category/default.png' ,
        name:"Clothes", 
      },
      {
        image:'/category/default.png' ,
        name:"Furniture", 
      },
      {
        image:'/category/default.png' ,
        name:"Groceries", 
      },
      {
        image:'/category/default.png' ,
        name:"Books", 
      },
      {
        image:'/category/default.png' ,
        name:"Jewelry", 
      },
    ];
      await queryInterface.bulkInsert('categories',dummyCategory, {});
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('categories', null, {});
  }
};
