const { Student } = require("../models");

class StudentsControllers {
  static notFoundMessage = (id) => {
    throw { status: 404, message: `Student with ID ${id} not found` };
  };

  static getAllStudents = async (req, res, next) => {
    try {
      const students = await Student.findAll();
      res.status(200).json({ message: "Success", data: students });
    } catch (error) {
      next(error);
    }
  };

  static getStudentById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const studentExists = await Student.findByPk(id);

      if (!studentExists) {
        this.notFoundMessage(id);
      }

      res.status(200).json({ message: "Success", data: studentExists });
    } catch (error) {
      next(error);
    }
  };

  static createStudent = async (req, res, next) => {
    try {
      const { first_name, last_name, email, gender } = req.body;

      if (!first_name || !last_name || !email || !gender) {
        throw {
          status: 400,
          message:
            "All fields are required: first_name, last_name, email, gender.",
        };
      }

      const newStudent = await Student.create({
        first_name,
        last_name,
        email,
        gender,
      });

      res
        .status(201)
        .json({ message: "Student created successfully.", data: newStudent });
    } catch (error) {
      next(error);
    }
  };

  static updateStudent = async (req, res, next) => {
    try {
      const { id } = req.params;

      const { first_name, last_name, email, gender } = req.body;

      if (!first_name || !last_name || !email || !gender) {
        throw {
          status: 400,
          message:
            "All fields are required: first_name, last_name, email, gender.",
        };
      }

      const [affectedCount, data] = await Student.update(
        {
          first_name,
          last_name,
          email,
          gender,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (affectedCount === 0) {
        this.notFoundMessage(id);
      }

      const updatedStudent = data[0]?.dataValues;

      res.status(200).json({
        message: "Data updated successfully.",
        data: updatedStudent,
      });
    } catch (error) {
      next(error);
    }
  };

  static patchStudent = async (req, res, next) => {
    try {
      const { first_name, last_name, email, gender } = req.body;

      if (!first_name && !last_name && !email && !gender) {
        throw {
          status: 400,
          message:
            "Please input one of these fields: first_name, last_name, email, gender.",
        };
      }

      const id = req.params.id;

      const updates = {};
      if (first_name) updates.first_name = first_name;
      if (last_name) updates.last_name = last_name;
      if (email) updates.email = email;
      if (gender) updates.gender = gender;

      const [_, data] = await Student.update(updates, {
        where: { id },
        returning: true,
      });

      if (affectedCount === 0) {
        this.notFoundMessage(id);
      }

      const updatedStudent = data[0]?.dataValues;

      res.status(200).json({
        message: "Data updated successfully.",
        data: updatedStudent,
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteStudent = async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await Student.destroy({
        where: { id },
      });

      if (response === 0) {
        notFoundMessage(id);
      }

      res.status(200).json({
        message: "Data deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = StudentsControllers;
