import {Component} from "@angular/core";
import { Todo } from "../../models/todo";
import {Store} from '@ngrx/store';
import { AppState } from "../../store";
import * as fromStore from "../../store"
import { Observable } from "rxjs";
import { TodoActionEventData } from "../../models/todo-action-event-data";

@Component({
  selector: "todo-app",
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
})
export class TodoAppComponent {
  // #5 - can add $ => https://angular.io/guide/rx-library#naming-conventions-for-observables
  public activeTodos$: Observable<Todo[]> | null;
  public completeTodos$: Observable<Todo[]> | null;

  // #6 - the above construction we can use in such way. It's not mandatory init Observables with ngOnInit
  // activeTodos$: Observable<Todo[]> = this.store.select(fromStore.getActiveTodos);
  // completeTodos$: Observable<Todo[]> = this.store.select(fromStore.getCompleteTodos);

  constructor(private store: Store<AppState>) {  }

  ngOnInit() {
    this.activeTodos$ = this.store.select(fromStore.getActiveTodos);
    this.completeTodos$ = this.store.select(fromStore.getCompleteTodos);
  }

  handleTodoCreated(todo: Todo) {
      this.store.dispatch(new fromStore.CreateTodo(todo));
  }

  handleTodoAction(event: TodoActionEventData) {
    this.store.dispatch(event.actionType);
  }
}
