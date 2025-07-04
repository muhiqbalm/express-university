"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Mengubah kolom first_name menjadi NOT NULL
    await queryInterface.changeColumn("Students", "first_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Mengubah kolom last_name menjadi NOT NULL
    await queryInterface.changeColumn("Students", "last_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Mengubah kolom email menjadi NOT NULL (jika diinginkan)
    await queryInterface.changeColumn("Students", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Opsional: tambahkan unique jika email harus unik
    });

    // Mengubah kolom gender menjadi NOT NULL
    await queryInterface.changeColumn("Students", "gender", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Mengembalikan kolom ke keadaan semula (bisa NULL) jika migrasi di-rollback
    await queryInterface.changeColumn("Students", "first_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("Students", "last_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("Students", "email", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("Students", "gender", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
