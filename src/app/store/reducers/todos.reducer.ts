import {CompletedTodo, CompleteTodo, CreatedTodo, CreateTodo, EditTodo, GetAllTodos, GotAllTodos, RemoveTodo, RestoredTodo, RestoreTodo} from '../actions/todos.action';

import { InitialState } from "@ngrx/store/src/models";
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Todo } from "../../models/todo";
import { Status } from '../../models/todo-status';
import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { TodoService } from 'src/app/services/todo.service';

export interface TodoState {
    data: { [id: string]: Todo }
}
export const initialState: TodoState = {
    data: {}
};

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
    selectId: (todo: Todo) => todo.id,
    sortComparer: false,
  });

export const reducer = createReducer(
    initialState,
    on(GetAllTodos, (state, action) => ({...state})),
    on(GotAllTodos, (state, action) => {
        const todos =  action.payload as Todo[];
        const data = todos.reduce((acc: {[id: string]: Todo}, todo: Todo) => {
            const typedTodo = Object.assign(new Todo(todo.title, todo.description), todo)
            return {
                ...acc,
                [todo.id]: typedTodo
            }
        }, {...state.data});
        return {...state, data: {...data}};
    }),
    on(CreateTodo, (state, action) => ({...state})),
    on(CreatedTodo, (state, action) => {
        const todo = action.payload;
        const data = {
            ...state.data,
            [todo.id]: todo
        };
        return {...state, data}
    }),
    on(RemoveTodo, (state, action) => {
        const todo = action.payload;
        const {[todo.id]: removed, ...data} = state.data;
        return {...state, data};
    }),
    on(CompleteTodo, (state, action) => {
        const completedTodo = {...action.payload, state: Status.Completed};
        const data = {...state.data, [completedTodo.id]: completedTodo};
        return {...state, data};
    }),
    on(CompletedTodo, (state, action) => {
        return {...state};
    }),
    on(RestoreTodo, (state, action) => {
        const restoredTodo = {...action.payload, state: Status.Active};
        const data = {...state.data, [restoredTodo.id]: restoredTodo};
        return {...state, data};
    }),
    on(RestoredTodo, (state, action) => {
        return {...state};
    }),
    on(EditTodo, (state, action) => {
        const todo = action.payload;
        const updatedTodo = {...state.data[todo.id], title: todo.title, description: todo.description};
        const data = {...state.data, [updatedTodo.id]: updatedTodo};
        return {...state, data};
    })
);

export const getTodos = (state: TodoState) => state.data;

export function logger(reducer) {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}
