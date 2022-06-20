import { union } from '@ngrx/store';
import * as TodoActions from "./todos.action";
export * from "./todos.action"

export const TodoActionUnion = union({...TodoActions});