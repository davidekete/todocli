import inquirer from "inquirer";
import fs from "fs";
import { getTasksFromFile } from "../helper/tasks";
import { taskInterface } from "../interfaces/task";

export const deleteTask = function () {
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
        message: "Select a task(s) to delete",
        choices: choicesArray,
      },
    ])
    .then((tasknames) => {
      if (Array.isArray(tasknames)) {
        tasknames.forEach((taskname) => {
          const index = allTasks.tasks.indexOf(taskname);
          allTasks.tasks.splice(index, 1);
        });
      } else {
        const index = allTasks.tasks.indexOf(tasknames);
        allTasks.tasks.splice(index, 1);
      }
      const jsonData = JSON.stringify(allTasks);

      fs.writeFileSync("tasklist.json", jsonData, "utf8");
    });
};
