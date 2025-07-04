const { Subject, Lecturer } = require("../models");

class SubjectsControllers {
  static notFoundMessage = (id) => {
    throw { status: 404, message: `Subject with ID ${id} not found` };
  };

  static checkIdLecturer = async (id_lecturer) => {
    const lecturerExists = await Lecturer.findByPk(id_lecturer);

    if (!lecturerExists) {
      throw {
        status: 404,
        message: `Lecturer with ID ${id_lecturer} not found`,
      };
    }
  };

  static getAllSubjects = async (req, res, next) => {
    try {
      const subjects = await Subject.findAll();
      res.status(200).json({ message: "success", data: subjects });
    } catch (error) {
      next(error);
    }
  };

  static getSubjectById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const subjectExists = await Subject.findByPk(id);

      if (!subjectExists) {
        this.notFoundMessage(id);
      }

      res.status(200).json({ message: "success", data: subjectExists });
    } catch (error) {
      next(error);
    }
  };

  static createSubject = async (req, res, next) => {
    try {
      const { name, sks, id_lecturer } = req.body;

      if (!name || !sks || !id_lecturer) {
        throw {
          status: 400,
          message: "All fields are required: name, sks, id_lecturer.",
        };
      }

      await this.checkIdLecturer(id_lecturer);

      const newSubject = await Subject.create({
        name,
        sks,
        id_lecturer,
      });

      res
        .status(201)
        .json({ message: "Subject created successfully.", data: newSubject });
    } catch (error) {
      next(error);
    }
  };

  static updateSubject = async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name, sks, id_lecturer } = req.body;

      if (!name || !sks || !id_lecturer) {
        throw {
          status: 400,
          message: "All fields are required: name, sks, id_lecturer.",
        };
      }

      await this.checkIdLecturer(id_lecturer);

      const [affectedCount, data] = await Subject.update(
        {
          name,
          sks,
          id_lecturer,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (affectedCount === 0) {
        this.notFoundMessage(id);
      }

      const updatedSubject = data[0].dataValues;

      res.status(200).json({
        message: "Data updated successfully.",
        data: updatedSubject,
      });
    } catch (error) {
      next(error);
    }
  };

  static patchSubject = async (req, res, next) => {
    try {
      const { name, sks, id_lecturer } = req.body;

      if (!name && !sks && !id_lecturer) {
        throw {
          status: 400,
          message: "Please input one of these fields: name, sks, id_lecturer.",
        };
      }

      const id = req.params.id;

      await this.checkIdLecturer(id_lecturer);

      const updates = {};
      if (name) updates.name = name;
      if (sks) updates.sks = sks;
      if (id_lecturer) updates.id_lecturer = id_lecturer;

      const [affectedCount, data] = await Subject.update(updates, {
        where: { id },
        returning: true, // Optional: return the updated rows for databases that support it (e.g., PostgreSQL)
      });

      if (affectedCount === 0) {
        this.notFoundMessage(id);
      }

      const updatedSubject = data[0].dataValues;

      res.status(200).json({
        message: "Data updated successfully.",
        data: updatedSubject,
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteSubject = async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await Subject.destroy({
        where: { id },
      });

      if (response === 0) {
        throw { status: 404, message: `Subject with ID ${id} not found` };
      }

      res.status(200).json({
        message: "Data deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SubjectsControllers;
