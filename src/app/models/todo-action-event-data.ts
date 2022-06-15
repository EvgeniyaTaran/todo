import { TodoActionUnion } from "../store";
import { Todo } from "./todo";

export interface ActionEventData {
    actionType: typeof TodoActionUnion,
}