'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert(
      "Users",
      [
        { email: "gates@gmail.com", password: "gates123", firstName: "Bill", lastName: "Gates", username: "billgates"},
        { email: "james123@gmail.com", password: "james123", firstName: "James", lastName: "Smith", username: "james123"}
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
