'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      var dummySubcategory =[
        {
          image:'/subcategory/default.png',
          name:'Jens',
          category_id:2
        },{
          image:'/subcategory/default.png',
          name:'T-shirt',
          category_id:2
        },
        {
          image:'/subcategory/default.png',
          name:'Computer and accessories',
          category_id:1
        },{
          image:'/subcategory/default.png',
          name:'Mobile and Laptops',
          category_id:1
        },
        {
          image:'/subcategory/default.png',
          name:'Sofa',
          category_id:3
        },{
          image:'/subcategory/default.png',
          name:'Table',
          category_id:3
        },
        {
          image:'/subcategory/default.png',
          name:'Necklace',
          category_id:6
        },{
          image:'/subcategory/default.png',
          name:'Rings',
          category_id:6
        }
      ];
      await queryInterface.bulkInsert('subcategories',dummySubcategory, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
     await queryInterface.bulkDelete('subcategories', null, {});
     
  }
};
