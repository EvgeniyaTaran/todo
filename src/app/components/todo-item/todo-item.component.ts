import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ActionType} from 'src/app/models/action-type';
import { Todo } from 'src/app/models/todo';
import { TodoStatus } from "src/app/models/todo-status";


@Component({
  selector: "todo-item",
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  TodoState = TodoStatus;
  ActionType = ActionType;
  @Input()
  public todo: Todo | undefined;

  @Output()
  public clicked = new EventEmitter<ActionType>();

  constructor() {
  }

  public onEdit() {
    this.clicked.emit(ActionType.EDIT);
  }

  public onDelete() {
    this.clicked.emit(ActionType.DELETE);
  }

  public onComplete() {
    this.clicked.emit(ActionType.COMPLETE);
  }

  public onTodo() {
    this.clicked.emit(ActionType.TODO);
  }
}
