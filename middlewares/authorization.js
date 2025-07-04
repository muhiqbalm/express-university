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

const authorization = async (req, res, next, role = "student") => {
  try {
    const { user } = req;
    const { id: paramId } = req.params;
    console.log(user, paramId);

    if (user.role === "admin") return next();

    if (user.role === role) {
      if (!paramId || user.id == paramId) {
        console.log("12312312");
        return next();
      }
    }

    throw { status: 403, message: "Action forbidden." };
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization, adminAuthorization };
