"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lecturer.hasMany(models.Subject, { foreignKey: "id_lecturer" });
    }
  }
  Lecturer.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: { args: true, msg: "Email already exist." },
        validate: {
          isEmail: { args: true, msg: "Email format must be valid." },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["female", "male"]],
            msg: "Gender must be female or male",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Lecturer",
    }
  );
  return Lecturer;
};
