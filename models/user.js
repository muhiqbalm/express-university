"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Student, { foreignKey: "id" });
      User.hasOne(models.Lecturer, { foreignKey: "id" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Username already exist.",
        },
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["admin", "student", "lecturer"]],
            msg: "Role must be admin, student, or lecturer.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
