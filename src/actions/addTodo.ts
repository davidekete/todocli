import fs from "fs";
import inquirer from "inquirer";
import DatePrompt from "inquirer-date-prompt";
import * as spin from "cli-spinner";
import chalk from "chalk";

//@ts-expect-error
inquirer.registerPrompt("date", DatePrompt);

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

const addTodo = async function () {
  const { taskName, dueDate } = await getTodoArgs();

  const spinner = initializeSpinner();

  const task = {
    taskName,
    dueDate,
    done: false,
    isDue: taskDue(this.dueDate),
  };

  const taskData = JSON.stringify(task);

  fs.writeFile("tasklist.json", taskData, "utf-8", (error) => {
    if (error) {
      console.log(`Writefile Error ${error}`);
      return;
    }

    spinner.stop();
  });
};

export default addTodo;
