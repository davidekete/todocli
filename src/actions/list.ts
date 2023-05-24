import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import { taskInterface } from "../interfaces/task";
import { getTasksFromFile } from "../helper/tasks";

const getAllTasks = function () {
  const taskList: any[] = [];

  const allTasks: taskInterface = getTasksFromFile("tasklist.json", "utf-8");

  allTasks.tasks.forEach((element) => {
    let date = Date.now();

    let daysDue =
      new Date(element.dueDate).getDate() - new Date(date).getDate();

    let task = {
      taskName: element.taskName,
      due: element.done
        ? `is due in ${chalk.bold.blue(daysDue)} ${
            daysDue === 1 ? "day" : "days"
          }`
        : chalk.bold.redBright(`is overdue`),
    };
    taskList.push(task);
  });

  const choicesArray: string[] = [];
  taskList.forEach((element) => {
    choicesArray.push(element.taskName);
  });

  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: chalk.green("Select a task to see details"),
        choices: choicesArray,
      },
    ])
    .then((answer) => {
      const task = taskList.find((element) => element.taskName === answer.task);
      console.log(chalk(`Your task: ${task.taskName} ${task.isDue}`));
    });
};

const getDoneTasks = function () {
  const allTasks: taskInterface = getTasksFromFile("tasklist.json", "utf-8");
  const doneTasks = allTasks.tasks.filter((task) => task.done === true);

  if (doneTasks.length < 1) {
    console.log(chalk.italic.blue("You haven't completed any tasks."));
  } else {
    const choicesArray: string[] = [];
    doneTasks.forEach((task) => {
      choicesArray.push(task.taskName);
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "task",
          message: chalk.green("Select a task to see details"),
          choices: choicesArray,
        },
      ])
      .then((answer) => {
        const task = doneTasks.find(
          (element) => element.taskName === answer.task
        );

        console.log(
          chalk.bold(
            `Task Name: ${task?.taskName}, Due Date: ${task?.dueDate}, Completed: ${task?.done}`
          )
        );
      });
  }
};

const getUndoneTasks = function () {};

const getDueTasks = function () {};

// const dateFormatter = function (date: any) {
//   const rtf = new Intl.RelativeTimeFormat("en", {
//     localeMatcher: "best fit",
//     numeric: "always",
//     style: "long",
//   });

//   // return rtf.format()
// };
