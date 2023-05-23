#!/usr/bin/env node

import { program } from "commander";
import addTodo from "./actions/addTodo";

program
  .command("add")
  .description("Add a new task to your TodoList")
  .action(addTodo);

program.parse();
