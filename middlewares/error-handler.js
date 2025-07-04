const SEQUELIZE_ERROR_NAME = [
  "SequelizeUniqueConstraintError",
  "SequelizeValidationError",
];

const errorHandler = (err, req, res, next) => {
  let statusCode = SEQUELIZE_ERROR_NAME.includes(err.name)
    ? 400
    : err.status || 500;

  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
