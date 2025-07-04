"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudyPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudyPlan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_student: DataTypes.INTEGER,
      id_subject: DataTypes.INTEGER,
      semester: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "StudyPlan",
    }
  );
  return StudyPlan;
};
