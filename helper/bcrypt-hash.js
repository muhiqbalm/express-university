const bcrypt = require("bcrypt");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 10);

const bcryptHash = async (rawInput) => {
  try {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const encryptedInput = bcrypt.hashSync(rawInput, salt);
    return encryptedInput;
  } catch (error) {
    console.error("Error during bcrypt hashing:", error);
    throw new Error("Failed to encrypt input.");
  }
};

module.exports = bcryptHash;
