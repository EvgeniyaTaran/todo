import { TodoAction } from "../store";
import { Todo } from "./todo";

export interface TodoActionEventData {
    actionType: TodoAction,
}