/* eslint-disable no-console */

const fs = require("fs");

const jsonReader = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
    return {};
  }
};

module.exports = jsonReader;
