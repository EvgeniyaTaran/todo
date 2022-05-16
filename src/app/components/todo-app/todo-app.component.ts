import {Component} from "@angular/core";
import { Todo } from "src/app/models/todo";
import {Store} from '@ngrx/store';
import { AppState } from "src/app/store";
import { TodoStatus } from "src/app/models/todo-status";
import {TodoAction} from "src/app/store/actions/todos.action";
import * as fromStore from "src/app/store"
import { Observable } from "rxjs";
import { TodoActionEventData } from "src/app/models/todo-action-event-data";

@Component({
  selector: "todo-app",
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
})
export class TodoAppComponent {
  public activeTodos: Observable<Todo[]> | null;
  public completeTodos: Observable<Todo[]> | null;

  constructor(private store: Store<AppState>) {  }

  ngOnInit() {
    this.activeTodos = this.store.select(fromStore.getActiveTodos);
    this.completeTodos = this.store.select(fromStore.getCompleteTodos);
  }

  handleTodoCreated(todo: Todo) {
      this.store.dispatch(new fromStore.CreateTodo(todo));
  }

  handleTodoAction(event: TodoActionEventData) {
    this.store.dispatch(event.actionType);
  }
}
