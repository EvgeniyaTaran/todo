import {ActionType} from '../../models/action-type'
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Todo } from '../../models/todo';
import { Status } from '../../models/todo-status';
import { ActionEventData } from '../../models/todo-action-event-data';
import { CompleteTodo, EditTodo, RemoveTodo, RestoreTodo } from '../../store';
import { EditData } from '../../models/todo-edit-data';

@Component({
  selector: "todo-list",
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
// #11 - ViewEncapsulation.None and https://angular.io/api/core/ChangeDetectionStrategy
// https://blog.angular-university.io/onpush-change-detection-how-it-works/

export class TodoListComponent {
  @Input()
  todos: Todo[] | null

  @Input()
  isActive: boolean = true;

  constructor() {
  }

  getTableName() {
    return this.isActive? "List Todo" : "Done";
  }

  TodoState = Status;
  ActionType = ActionType;

  activeTodo: EditData = {
    id: '',
    title: '',
    description: ''
  }

  @Output()
  clicked = new EventEmitter<ActionEventData>();

  activeTodoId: string | null;

  onEdit(todo: Todo) {
    this.activeTodo.title = todo.title;
    this.activeTodo.description = todo.description;
    this.activeTodo.id = todo.id;
  }

  onSave(todo: Todo) {
    const payload = {...this.activeTodo};
    this.clicked.emit({actionType: EditTodo({payload})});
    this.activeTodo.id = '';
  }

  onDelete(todo: Todo) {
    this.clicked.emit({actionType: RemoveTodo({payload: todo})});
  }

  onComplete(todo: Todo) {
    this.clicked.emit({actionType: CompleteTodo({payload: todo})});
  }

  onTodo(todo: Todo) {
    this.clicked.emit({actionType: RestoreTodo({payload: todo})});
  }

  trackFunction ( index: number, element: Todo ) {
    return element ? element.id : null
  }
}
