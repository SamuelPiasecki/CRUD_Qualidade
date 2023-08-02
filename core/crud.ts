/* eslint-disable no-console */
//const fs = require("fs"); - CommonJS
import fs from "fs"; // - ES6
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./core/db";

//console.log("[CRUD]");

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

export function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: Array<Todo> = [...read(), todo];

  // salvar o content no sistema
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  return todo;
}

export function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    // Fail Fast Validations
    return [];
  }
  return db.todos;
}

export function update(id: UUID, partialTodo: Partial<Todo>) {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  if (!updatedTodo) {
    throw new Error("Please, provide another ID");
  }

  return updatedTodo;
}

export function deleteById(id: UUID) {
  const todos = read();

  const todosWithoutOne = todos.filter((todo) => {
    if (id === todo.id) {
      return false;
    }
    return true;
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos: todosWithoutOne }, null, 2)
  );
}

// [SIMULATION]
/* CLEAR_DB();
create("PRIMEIRA TODO");
const segundaTodo = create("SEGUNDA CREATE");
deleteById(segundaTodo.id);
const terceiraTodo = create("TERCEIRA CREATE");
update(segundaTodo.id, {
    content: "SEGUNDA TODO com novo content",
    done: true
});
updateContentById(terceiraTodo.id, "TERCEIRA Atualizada");
console.log(read()); */
