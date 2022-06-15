import { ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import { Todo } from "../../models/todo";
import { Status } from "../../models/todo-status";

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

export const getActiveTodos = createSelector(getAllTodos, state => Object.keys(state)
    .filter(key => state[key].state === Status.Active)
    .map(id => state[id])); 

export const getCompleteTodos = createSelector(getAllTodos, state => Object.keys(state)
    .filter(key => state[key].state === Status.Completed)
    .map(id => state[id]));

export const getTodo = (id: string) => createSelector(getAllTodos, (state)=> {state[id]}); 

// how state looks like
// const state = {
//     todos: {
//          data: []
//     }
// }