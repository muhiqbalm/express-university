const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      throw { status: 401, message: "Unauthorized." };
    }

    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userData = await User.findByPk(decodedToken.id);

    if (!userData) {
      throw { status: 401, message: "Unauthorized." };
    }

    req.user = {
      id: userData.id,
      username: userData.username,
      role: userData.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or missing token." });
  }
};

module.exports = authentication;
