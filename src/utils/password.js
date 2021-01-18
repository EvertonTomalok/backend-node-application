const bcrypt = require("bcryptjs");

async function check(password, hash) {
  const comparison = await bcrypt.compare(password, hash);
  return comparison;
}

const encrypt = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

module.exports = { check, encrypt };
