const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { bcryptHash } = require("../helper");

class UsersControllers {
  static register = async (req, res, next) => {
    try {
      const { username, password, role } = req.body;

      if (!username || !password || !role) {
        throw {
          status: 400,
          message: "All fields are required: username, password, role.",
        };
      }

      const encryptedPassword = await bcryptHash(password);

      const newUser = await User.create({
        username,
        password: encryptedPassword,
        role,
      });

      res.status(201).json({
        message: "User registered successfully.",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw {
          status: 400,
          message: "All fields are required: username, password.",
        };
      }

      const dataUser = await User.findOne({ where: { username }, raw: true });

      if (!dataUser) {
        throw {
          status: 404,
          message: "Login failed. Please check your username or password.",
        };
      }

      const isMatch = await bcrypt.compare(password, dataUser.password);

      if (!isMatch) {
        throw {
          status: 404,
          message: "Login failed. Please check your username or password.",
        };
      }

      const token = jwt.sign(
        { id: dataUser.id, username: dataUser.username, role: dataUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      const manipulatedDataUser = {
        token,
        role: dataUser.username,
        username: dataUser.role,
      };

      res.status(200).json({
        message: "User login successfully.",
        data: manipulatedDataUser,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({ raw: true });

      const manipulatedUsers = users.map((user) => {
        const { password, ...rest } = user;
        return rest;
      });

      res.status(200).json({ message: "success", data: manipulatedUsers });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersControllers;
