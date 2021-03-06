import {Action} from '@ngrx/store';
import { Todo } from '../../models/todo';
import { TodoEditData } from '../../models/todo-edit-data';

export const CREATE_TODO = '[TODOS] Create todo';
export const REMOVE_TODO = '[TODOS] Delete todo';
export const COMPLETE_TODO = '[TODOS] Complete todo';
export const RESTORE_TODO = '[TODOS] Restore todo';
export const EDIT_TODO = '[TODOS] Edit todo';

// #9 - please use official guide for NGRX => https://ngrx.io/guide/store (work with actions)
export class CreateTodo implements Action {
    readonly type = CREATE_TODO;
    constructor(public payload: Todo) {}
}

export class RemoveTodo implements Action {
    readonly type = REMOVE_TODO;
    constructor(public payload: Todo) {}
}

export class CompleteTodo implements Action {
    readonly type = COMPLETE_TODO;
    constructor(public payload: Todo) {}
}

export class RestoreTodo implements Action {
    readonly type = RESTORE_TODO;
    constructor(public payload: Todo) {}
}

export class EditTodo implements Action {
    readonly type = EDIT_TODO;
    constructor(public payload: TodoEditData) {}
}

export type TodoAction = CreateTodo | RemoveTodo | CompleteTodo | RestoreTodo | EditTodo;
