import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
} from "./ActionType.js";

export const addTodo = (task) => ({
  type: ADD_TODO,
  payload: task,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});
