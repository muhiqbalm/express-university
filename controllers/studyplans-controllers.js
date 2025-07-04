const { Op } = require("sequelize");
const { StudyPlan, Lecturer, sequelize } = require("../models");

class StudyPlansControllers {
  static notFoundMessage = (id) => {
    throw { status: 404, message: `StudyPlan with ID ${id} not found` };
  };

  static checkIdSubject = async (id_subject) => {
    const subjectExists = await Lecturer.findByPk(id_subject);

    if (!subjectExists) {
      throw {
        status: 404,
        message: `Subject with ID ${id_subject} not found`,
      };
    }
  };

  static checkIdStudent = async (id_student) => {
    const studentExists = await Lecturer.findByPk(id_student);

    if (!studentExists) {
      throw {
        status: 404,
        message: `Student with ID ${id_student} not found`,
      };
    }
  };

  static handleErrorMessage = (error) => {
    let errorMessage = error;

    if (error.message.includes("StudyPlans_id_subject_fkey")) {
      errorMessage = { status: 404, message: "Subject ID not found." };
    }

    if (error.message.includes("StudyPlans_id_student_fkey")) {
      errorMessage = { status: 404, message: "Student ID not found." };
    }

    return errorMessage;
  };

  static getAllStudyPlans = async (req, res, next) => {
    try {
      const { id_student, semester, id_subject } = req.query;

      const queryParams = [];
      if (id_student) queryParams.push({ id_student });
      if (semester) queryParams.push({ semester });
      if (id_subject) queryParams.push({ id_subject });

      const studyPlans = await StudyPlan.findAll({
        where: {
          [Op.and]: queryParams,
        },
      });

      res.status(200).json({ message: "success", data: studyPlans });
    } catch (error) {
      next(error);
    }
  };

  static getStudyPlanById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const studyPlanExists = await StudyPlan.findByPk(id);

      if (!studyPlanExists) {
        this.notFoundMessage(id);
      }

      res.status(200).json({ message: "success", data: studyPlanExists });
    } catch (error) {
      next(error);
    }
  };

  static createStudyPlan = async (req, res, next) => {
    try {
      await sequelize.transaction(async (t) => {
        const { id_student, id_subjects, semester } = req.body;

        if (!id_student || !id_subjects || !semester) {
          throw {
            status: 400,
            message:
              "All fields are required: id_student, id_subjects, semester",
          };
        }

        const existingStudyPlan = await StudyPlan.findAll({
          where: { id_student, semester },
        });

        const result = await Promise.all(
          id_subjects.map((item) => {
            if (
              existingStudyPlan.some((subject) => subject.id_subject === item)
            ) {
              throw {
                status: 400,
                message: `Subject ID ${item} already listed on semester ${semester} study plan.`,
              };
            }

            return StudyPlan.create(
              {
                id_student,
                semester,
                id_subject: item,
              },
              { transaction: t }
            );
          })
        );

        res.status(201).json({
          message: "StudyPlan created successfully.",
          data: result,
        });
      });
    } catch (error) {
      const errorMessage = this.handleErrorMessage(error);
      next(errorMessage);
    }
  };

  static updateStudyPlan = async (req, res, next) => {
    try {
      const { id } = req.params;

      const { id_student, id_subject, semester } = req.body;

      if (!id_student || !id_subject || !semester) {
        throw {
          status: 400,
          message: "All fields are required: id_student, id_subject, semester.",
        };
      }

      const [affectedCount, data] = await StudyPlan.update(
        {
          id_student,
          semester,
          id_subject,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (affectedCount === 0) {
        this.notFoundMessage(id);
      }

      const updatedStudyPlan = data[0].dataValues;

      res.status(200).json({
        message: "Data updated successfully.",
        data: updatedStudyPlan,
      });
    } catch (error) {
      const errorMessage = this.handleErrorMessage(error);
      next(errorMessage);
    }
  };

  static patchStudyPlan = async (req, res, next) => {
    try {
      const { id_student, id_subject, semester } = req.body;

      if (!id_student && !id_subject && !semester) {
        throw {
          status: 400,
          message:
            "Please input one of these fields: id_student, id_subject, semester.",
        };
      }

      const id = req.params.id;

      const updates = {};
      if (id_student) updates.id_student = id_student;
      if (id_subject) updates.id_subject = id_subject;
      if (semester) updates.semester = id_subject;

      const [affectedCount, data] = await StudyPlan.update(updates, {
        where: { id },
        returning: true,
      });

      if (affectedCount === 0) {
        this.notFoundMessage(id);
      }

      const updatedStudyPlan = data[0].dataValues;

      res.status(200).json({
        message: "Data updated successfully.",
        data: updatedStudyPlan,
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteStudyPlan = async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await StudyPlan.destroy({
        where: { id },
      });

      if (response === 0) {
        throw { status: 404, message: `StudyPlan with ID ${id} not found` };
      }

      res.status(200).json({
        message: "Data deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = StudyPlansControllers;
