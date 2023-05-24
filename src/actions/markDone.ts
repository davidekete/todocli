import inquirer from "inquirer";
import { getTasksFromFile } from "../helper/tasks";
import { taskInterface } from "../interfaces/task";
import fs from "fs";

export const markDone = function () {
  console.clear();
  const allTasks: taskInterface = getTasksFromFile("tasklist.json", "utf-8");

  const choicesArray: string[] = [];
  allTasks.tasks.forEach((task) => {
    choicesArray.push(task.taskName);
  });

  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "tasks",
        message: "Select a task(s) to mark as done",
        choices: choicesArray,
      },
    ])
    .then((tasknames) => {
      if (Array.isArray(tasknames)) {
        tasknames.forEach((taskname) => {
          const index = allTasks.tasks.indexOf(taskname);
          allTasks.tasks[index].done = true;
        });
      } else {
        const index = allTasks.tasks.indexOf(tasknames);
        allTasks.tasks[index].done = true;
      }
      const jsonData = JSON.stringify(allTasks);

      fs.writeFileSync("tasklist.json", jsonData, "utf8");
    });
};
