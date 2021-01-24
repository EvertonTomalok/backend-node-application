/* eslint-disable no-console */

const prompt = require("prompt-sync")();
const Users = require("../models/users");
const Tools = require("../models/tools");

require("dotenv").config();

const ANSWER = process.env.TESTING === "true" ? "y" : prompt("Are you sure? [y/[n] ");
const LOGGING = process.env.LOGGING === 'false'?false:true;

const log = (text="") => {
  if (LOGGING){
    console.log(text);
  }
};

const dropAll = async () => {
  await Users.drop();
  await Tools.drop();
};

if (ANSWER.toLowerCase() === "y") {
  log("Ihhhaaa... We're getting crazy!!");
  dropAll().then().catch((error) => console.log(`The drop was failed: ${error}`)).finally(
    () => process.exit(0),
  );
} else {
  log("Yeah... not today!");
}
