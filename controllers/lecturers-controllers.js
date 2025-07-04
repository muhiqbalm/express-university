const { Lecturer } = require("../models");

class LecturersControllers {
  static notFoundMessage = (id) => {
    throw { status: 404, message: `Lecturer with ID ${id} not found` };
  };

  static getAllLecturers = async (req, res, next) => {
    try {
      const lecturers = await Lecturer.findAll();
      res.status(200).json({ message: "success", data: lecturers });
    } catch (error) {
      next(error);
    }
  };

  static getLecturerById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const lecturerExists = await Lecturer.findByPk(id);

      if (!lecturerExists) {
        this.notFoundMessage(id);
      }

      res.status(200).json({ message: "success", data: lecturerExists });
    } catch (error) {
      next(error);
    }
  };

  static createLecturer = async (req, res, next) => {
    try {
      const { first_name, last_name, email, gender } = req.body;

      if (!first_name || !last_name || !email || !gender) {
        throw {
          status: 400,
          message:
            "All fields are required: first_name, last_name, email, gender.",
        };
      }

      const newLecturer = await Lecturer.create({
        first_name,
        last_name,
        email,
        gender,
      });

      res
        .status(201)
        .json({ message: "Lecturer created successfully.", data: newLecturer });
    } catch (error) {
      next(error);
    }
  };

  static updateLecturer = async (req, res, next) => {
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

      const [affectedCount, data] = await Lecturer.update(
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

      const updatedLecturer = data[0].dataValues;

      res.status(200).json({
        message: "Data updated successfully.",
        data: updatedLecturer,
      });
    } catch (error) {
      next(error);
    }
  };

  static patchLecturer = async (req, res, next) => {
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

      const [_, data] = await Lecturer.update(updates, {
        where: { id },
        returning: true, // Optional: return the updated rows for databases that support it (e.g., PostgreSQL)
      });

      if (affectedCount === 0) {
        this.notFoundMessage(id);
      }

      const updatedLecturer = data[0].dataValues;

      res.status(200).json({
        message: "Data updated successfully.",
        data: updatedLecturer,
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteLecturer = async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await Lecturer.destroy({
        where: { id },
      });

      if (response === 0) {
        this.notFoundMessage(id);
      }

      res.status(200).json({
        message: "Data deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = LecturersControllers;
