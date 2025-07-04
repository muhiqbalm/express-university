"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.belongsTo(models.Lecturer, {
        foreignKey: "id_lecturer",
      });

      Subject.belongsToMany(models.Student, {
        through: models.StudyPlan,
        foreignKey: "id_subject",
        otherKey: "id_student",
      });
    }
  }
  Subject.init(
    {
      name: DataTypes.STRING,
      sks: DataTypes.INTEGER,
      id_lecturer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Subject",
    }
  );
  return Subject;
};
