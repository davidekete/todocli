import inquirer from "inquirer";
import chalk from "chalk";
import { taskInterface } from "../interfaces/task";
import { getTasksFromFile } from "../helper/tasks";

const getAllTasks = function () {
  console.clear();
  const taskList: any[] = [];

  const allTasks: taskInterface = getTasksFromFile("tasklist.json", "utf-8");

  allTasks.tasks.forEach((element) => {
    let date = Date.now();

    let daysDue =
      new Date(element.dueDate).getDate() - new Date(date).getDate();

    let task = {
      taskName: element.taskName,
      due: element.done
        ? `has been completed`
        : ` due in ${chalk.bold.blue(daysDue)} ${
            daysDue === 1 ? "day" : "days"
          }`,
          //chalk.bold.redBright(`overdue`)
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
      console.log(chalk(`Your task ${task.taskName} is ${task.due}`));
    });
};

const getTaskByStatus = function (boolean: boolean, message: string) {
  console.clear();

  const allTasks: taskInterface = getTasksFromFile("tasklist.json", "utf-8");
  const doneTasks = allTasks.tasks.filter((task) => task.done === boolean);

  if (doneTasks.length < 1) {
    console.log(chalk.italic.blue(message));
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

const getDoneTasks = function () {
  getTaskByStatus(true, "You haven't completed any tasks.");
};

const getUndoneTasks = function () {
  getTaskByStatus(false, "You don't have any uncompleted tasks.");
};

export { getAllTasks, getUndoneTasks, getDoneTasks };
