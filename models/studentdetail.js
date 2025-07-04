"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentDetail.belongsTo(models.Student, { foreignKey: "id_student" });
    }
  }
  StudentDetail.init(
    {
      address: DataTypes.STRING,
      age: DataTypes.INTEGER,
      id_student: DataTypes.INTEGER,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StudentDetail",
    }
  );
  return StudentDetail;
};
