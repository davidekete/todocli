import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";

const getAllTasks = function () {
  const taskList = [];

  fs.readFile("tasklist.json", "utf-8", (err, data) => {
    if (err) {
      console.log(`ReadFile Error: ${err}`);
    }
    data = JSON.parse(data);
    

  });
};

const getDoneTasks = function () {};

const getUndoneTasks = function () {};

const getDueTasks = function () {};
