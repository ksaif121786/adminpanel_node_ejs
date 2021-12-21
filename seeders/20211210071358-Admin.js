'use strict';
 const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('admins', [{
        firstname: 'admin',
        lastname: 'admin',
        email:'admin@admin.com',
        password:await bcrypt.hashSync("123456",10)
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('admins', null, {});
    
  }
};
