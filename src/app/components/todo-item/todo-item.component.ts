import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ActionType} from '../../models/action-type';
import { Todo } from '../../models/todo';
import { Status } from "../../models/todo-status";


@Component({
  selector: "todo-item",
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  TodoState = Status;
  ActionType = ActionType;
  @Input()
  todo: Todo | undefined;

  @Output()
  clicked = new EventEmitter<ActionType>();

  constructor() {
  }

  onEdit() {
    this.clicked.emit(ActionType.EDIT);
  }

  onDelete() {
    this.clicked.emit(ActionType.DELETE);
  }

  onComplete() {
    this.clicked.emit(ActionType.COMPLETE);
  }

  onTodo() {
    this.clicked.emit(ActionType.TODO);
  }
}
