/* eslint-disable no-console */

const prompt = require("prompt-sync")();
const Users = require("../models/users");
const Tools = require("../models/tools");

const dropAll = async () => {
  await Users.drop();
  await Tools.drop();
};

const answer = prompt("Are you sure? [y/[n] ");

if (answer.toLowerCase() === "y") {
  console.log("Ihhhaaa... We're getting crazy!!");
  dropAll().then().catch((error) => console.log(`The drop was failed: ${error}`)).finally(
    () => process.exit(0),
  );
} else {
  console.log("Yeah... not today!");
}
