"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        { email: "gates@gmail.com", password: "gates123", firstName: "Bill", lastName: "Gates", username: "billgates" },
        {
          username: "james123",
          email: "james123@gmail.com",
          password: "james123",
          firstName: "James",
          lastName: "Smith",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("table_name", { name: { [Op.like]: "John Doe Fakename%" } }, {});
  },
};
