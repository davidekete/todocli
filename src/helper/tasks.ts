import fs from "fs";

export const getTasksFromFile = function (
  path: string,
  encoding: BufferEncoding
) {
  try {
    const jsonData = fs.readFileSync(path, encoding);

    const allTasks = JSON.parse(jsonData);
    return allTasks;
  } catch (error) {
    console.log(error);
  }
};
