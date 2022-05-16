import { ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import { Todo } from "../../models/todo";
import { TodoStatus } from "../../models/todo-status";

import * as todoReducer from './todos.reducer';

export interface AppState {
    todos: todoReducer.TodoState
}

export const reducers: ActionReducerMap<AppState, any> = { //ActionReducerMap<AppState>
    todos: todoReducer.reducer
};

export const getAppState = createFeatureSelector<AppState>('todos');

export const getTodosState = createSelector(getAppState, (state: AppState) => state.todos);

export const getAllTodos = createSelector(getTodosState, todoReducer.getTodos);

export const getActiveTodos = createSelector(getAllTodos, (todos => todos.filter(todo => todo.state === TodoStatus.Active)));

export const getCompleteTodos = createSelector(getAllTodos, (todos => todos.filter(todo => todo.state === TodoStatus.Completed)));

// how state looks like
// const state = {
//     todos: {
//          data: []
//     }
// }