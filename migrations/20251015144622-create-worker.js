'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Workers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Fullname: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Residence: {
        type: Sequelize.STRING
      },
      MaritalStatus: {
        type: Sequelize.STRING
      },
      MonthlySalary: {
        type: Sequelize.STRING
      },
      Age: {
        type: Sequelize.STRING
      },
      YearsInResidence: {
        type: Sequelize.STRING
      },
      Position: {
        type: Sequelize.STRING
      },
      ContactInformation: {
        type: Sequelize.STRING
      },
      workerId: {
        type: Sequelize.INTEGER
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      paymentAmount: {
        type: Sequelize.STRING
      },
      paymentNotes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Workers');
  }
};