"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Students", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      unique: true,
      primaryKey: true,
      autoIncrement: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Students", "Students_id_fkey");
  },
};
