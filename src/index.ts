#!/usr/bin/env node
import { program } from "commander";
import addTodo from "./actions/addTodo";
import { getAllTasks, getDoneTasks, getUndoneTasks } from "./actions/list";
import { markDone } from "./actions/markDone";

program
  .command("add")
  .description("Add a new task to your TodoList")
  .action(addTodo);

program
  .command("listall")
  .description("List all existing tasks")
  .action(getAllTasks);

program
  .command("listdone")
  .description("List all done tasks")
  .action(getDoneTasks);

program
  .command("listundone")
  .description("List all uncompleted tasks")
  .action(getUndoneTasks);

program
  .command("markdone")
  .description("Mark completed tasks as done")
  .action(markDone);

program.parse();
