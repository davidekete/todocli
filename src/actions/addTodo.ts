import fs from "fs";
import inquirer from "inquirer";
import DatePrompt from "inquirer-date-prompt";
import * as spin from "cli-spinner";
import chalk from "chalk";
import { taskType } from "../types/task";
import { taskInterface } from "../interfaces/task";

//@ts-expect-error
inquirer.registerPrompt("date", DatePrompt);

const tasksJSON: taskInterface = {
  tasks: [],
};

const initializeSpinner = function () {
  const spinner = new spin.Spinner("Adding Todo... %s");
  spinner.setSpinnerString("|/-\\\\");
  spinner.start();

  return spinner;
};

const taskDue = function (dueDate: string) {
  const taskTimestamp = new Date(dueDate);

  const dueTimestamp = Number(taskTimestamp) - Date.now();

  if (dueTimestamp < 0) {
    return true;
  }
  return false;
};

const getTodoArgs = async function () {
  try {
    const args = await inquirer.prompt([
      {
        name: "taskName",
        message: "Enter Task Name",
        type: "input",
      },
      {
        name: "dueDate",
        message: "Enter Task's Due Date",
        type: "date",
        transformer: (s: any) => chalk.bold.green(s),
      },
    ]);

    return args;
  } catch (error) {
    console.log(error);
  }
};

const saveTasks = function (taskData: taskType) {
  try {
    //Check if file exists
    const fileExists = fs.existsSync("tasklist.json");

    if (fileExists) {
      //Get data in JSON file
      const existingData = fs.readFileSync("tasklist.json", "utf-8");

      //Parse data
      const data: taskInterface = JSON.parse(existingData);

      //Update tasks data
      data.tasks.push(taskData);

      //Stringify updated task data
      const jsonData = JSON.stringify(data);

      fs.writeFileSync("tasklist.json", jsonData, "utf8");
    } else {
      tasksJSON.tasks.push(taskData);

      const jsonData = JSON.stringify(tasksJSON);

      fs.writeFileSync("tasklist.json", jsonData, "utf8");
    }
  } catch (error) {
    console.log(error);
  }
};

const addTodo = async function () {
  try {
    console.clear();
    const { taskName, dueDate } = await getTodoArgs();

    const spinner = initializeSpinner();

    const task = {
      taskName,
      dueDate,
      done: false,
      isDue: taskDue(this.dueDate),
    };

    saveTasks(task);
    spinner.stop();
    console.clear();
    console.log(
      `New task: ${chalk.blue(
        taskName
      )} added to TodoList. Your task is due on ${chalk.red(dueDate)}`
    );
  } catch (err) {
    console.log(err);
  }
};

export default addTodo;
