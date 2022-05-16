import * as todoActions from '../actions/todos.action';
import { InitialState } from "@ngrx/store/src/models";
import { Todo } from "src/app/models/todo";
import { TodoStatus } from 'src/app/models/todo-status';

export interface TodoState {
    data: Todo[]
}
export const initialState: TodoState = {
    data: [
        new Todo("Sleep", "8 hours"),
        new Todo("Surfing", "6", TodoStatus.Completed)
    ]
};

export function reducer(
    state = initialState,
    action: todoActions.TodoAction
): TodoState {
    switch(action.type) {
        case(todoActions.CREATE_TODO):{
            if(state.data.every(x => x.title.toLowerCase() !== action.payload.title.toLowerCase())) {
                return {
                    ...state,
                    data:[...state.data, action.payload]
                };
            } else {
                return {...state}
            }
        }
        case(todoActions.REMOVE_TODO): {
            const data = state.data.filter(x => x.id !== action.payload.id);
            return {...state, data}
        }
        case(todoActions.COMPLETE_TODO): {
            const data = state.data.map(x => {
                if(x.id === action.payload.id) {
                    return {...action.payload, state: TodoStatus.Completed};
                }
                else {
                    return x;
                }
            });
            return {...state, data};
        }
        case(todoActions.RESTORE_TODO): {
            const data = state.data.map(x => {
                if(x.id === action.payload.id) {
                    return {...action.payload, state: TodoStatus.Active};
                }
                else {
                    return x;
                }
            });
            return {...state, data};
        }
        case(todoActions.EDIT_TODO): {
            const data = state.data.map(x => {
                if(x.id === action.payload.id) {
                    const dto = action.payload;
                    return {...x, title: dto.title, description: dto.description};
                }
                else {
                    return x;
                }
            });
            return {...state, data};
        }
        default:
    }
    return state;
}

export const getTodos = (state: TodoState) => state.data;