"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasOne(models.StudentDetail, { foreignKey: "id_student" });

      Student.belongsTo(models.User, { foreignKey: "id" });

      Student.belongsToMany(models.Subject, {
        through: models.StudyPlan,
        foreignKey: "id_student",
        otherKey: "id_subject",
      });
    }
  }
  Student.init(
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
            msg: "Gender must be female or male.",
          },
        },
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: {
          args: true,
          msg: "ID user already used.",
        },
      },
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
