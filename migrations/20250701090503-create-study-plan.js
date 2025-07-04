"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("StudyPlans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_student: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Students", key: "id" },
          onDelete: "CASCADE",
        },
      },
      id_subject: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Lecturers", key: "id" },
          onDelete: "CASCADE",
        },
      },
      semester: { type: Sequelize.INTEGER },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("StudyPlans");
  },
};
