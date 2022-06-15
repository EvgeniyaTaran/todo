import {Action, createAction, props} from '@ngrx/store';
import { Todo } from '../../models/todo';
import { EditData } from '../../models/todo-edit-data';

const GET_ALL = '[TODOS] Get all todos';
const GOT_ALL = '[API] Successfuly got all todos'; 
const CREATE_TODO = '[TODOS] Create todo';
const CREATED_TODO = '[API] Successfully created todo';
const REMOVE_TODO = '[TODOS] Delete a todo';
const REMOVED_TODO = '[API] Successfuly deleted a todo';
const COMPLETE_TODO = '[TODOS] Complete todo';
const COMPLETED_TODO = '[API] Successfuly completed todo';
const RESTORE_TODO = '[TODOS] Restore todo';
const RESTORED_TODO = '[API] Successfuly restored todo';
const EDIT_TODO = '[TODOS] Edit todo';
const EDITED_TODO = '[API] Successfuly edited todo';

// #9 - please use official guide for NGRX => https://ngrx.io/guide/store (work with actions)
// export class CreateTodo implements Action {
//     readonly type = CREATE_TODO;
//     constructor(payload: Todo) {}
// }
export const GetAllTodos = createAction(
    GET_ALL,
);

export const GotAllTodos = createAction(
    GOT_ALL,
    props<{payload: Todo[]}>()
);

export const CreateTodo = createAction(
    CREATE_TODO,
    props<{payload: Todo}>()
);

export const CreatedTodo = createAction(
    CREATED_TODO,
    props<{payload: Todo}>()
);

export const RemoveTodo = createAction(
    REMOVE_TODO,
    props<{payload: Todo}>()
);

export const RemovedTodo = createAction(
    REMOVED_TODO,
    props<{payload: Todo}>()
);

export const CompleteTodo = createAction(
    COMPLETE_TODO,
    props<{payload: Todo}>()
);

export const CompletedTodo = createAction(
    COMPLETED_TODO,
    props<{payload: Todo}>()
);

export const RestoreTodo = createAction(
    RESTORE_TODO,
    props<{payload: Todo}>()
);

export const RestoredTodo = createAction(
    RESTORED_TODO,
    props<{payload: Todo}>()
);

export const EditTodo = createAction(
    EDIT_TODO,
    props<{payload: EditData}>()
);

export const EditedTodo = createAction(
    EDITED_TODO,
    props<{payload: Todo}>()
);
