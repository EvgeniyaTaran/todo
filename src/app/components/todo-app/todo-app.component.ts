import {Component} from "@angular/core";
import { Todo } from "../../models/todo";
import {Store} from '@ngrx/store';
import { AppState, CreateTodo, GetAllTodos } from "../../store";
import * as fromStore from "../../store"
import { Observable } from "rxjs";
import { ActionEventData } from "../../models/todo-action-event-data";
import { tap } from 'rxjs/operators'

@Component({
  selector: "todo-app",
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss'],
})
export class TodoAppComponent {
  // #5 - can add $ => https://angular.io/guide/rx-library#naming-conventions-for-observables
  activeTodos$: Observable<Todo[]> = this.store.select(fromStore.getActiveTodos);
  completeTodos$: Observable<Todo[]> = this.store.select(fromStore.getCompleteTodos);

  // #6 - the above construction we can use in such way. It's not mandatory init Observables with ngOnInit
  // activeTodos$: Observable<Todo[]> = this.store.select(fromStore.getActiveTodos);
  // completeTodos$: Observable<Todo[]> = this.store.select(fromStore.getCompleteTodos);

  ngOnInit() {
    this.store.dispatch(GetAllTodos());
  }

  constructor(private store: Store<AppState>) {  }


  handleTodoCreated(payload: Todo) {
      this.store.dispatch(CreateTodo({payload}));
  }

  handleTodoAction(event: ActionEventData) {
    this.store.dispatch(event.actionType);
  }
}
