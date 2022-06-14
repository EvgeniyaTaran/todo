import {ActionType} from '../../models/action-type'
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoStatus } from '../../models/todo-status';
import { TodoActionEventData } from '../../models/todo-action-event-data';
import { CompleteTodo, EditTodo, RemoveTodo, RestoreTodo } from '../../store';
import { TodoEditData } from '../../models/todo-edit-data';

@Component({
  selector: "todo-list",
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListComponent {
  @Input()
  public todos: Todo[] | null

  @Input()
  public isActive: boolean = true;
  
  constructor() {
  }

  public getTableName() {
    return this.isActive? "List Todo" : "Done";
  }
  
  TodoState = TodoStatus;
  ActionType = ActionType;

  public activeTodo: TodoEditData = {
    id: '',
    title: '',
    description: ''
  }

  @Output()
  public clicked = new EventEmitter<TodoActionEventData>();

  public activeTodoId: string | null;

  public onEdit(todo: Todo) {
    this.activeTodo.title = todo.title;
    this.activeTodo.description = todo.description;
    this.activeTodo.id = todo.id;
  }

  public onSave(todo: Todo) {
    this.clicked.emit({actionType: new EditTodo({...this.activeTodo})});
    this.activeTodo.id = '';
  }

  public onDelete(todo: Todo) {
    this.clicked.emit({actionType: new RemoveTodo(todo)});
  }

  public onComplete(todo: Todo) {
    this.clicked.emit({actionType: new CompleteTodo(todo)});
  }

  public onTodo(todo: Todo) {
    this.clicked.emit({actionType: new RestoreTodo(todo)});
  }

  public trackFunction ( index: number, element: Todo ) {
    return element ? element.id : null
  }
}
