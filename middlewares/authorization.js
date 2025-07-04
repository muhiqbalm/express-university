const adminAuthorization = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw { status: 403, message: "Action forbidden." };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminAuthorization;
