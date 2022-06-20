import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Actions, createEffect, ofType, concatLatestFrom } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { TodoService } from "src/app/services/todo.service";
import { CompletedTodo, CompleteTodo, CreatedTodo, CreateTodo, EditedTodo, EditTodo, GetAllTodos, GotAllTodos, RemovedTodo, RemoveTodo, RestoredTodo, RestoreTodo } from "../actions";
import { tap } from "rxjs/operators";
import { TodoState } from "../reducers/todos.reducer";
import { getTodo } from "../reducers";
import { Todo } from "src/app/models/todo";

@Injectable()
export class Effects {
    constructor(
        private actions$: Actions,
        private todoService: TodoService,
        private store: Store<TodoState>
      ) {}

    createTodo$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CreateTodo),
        // #12 - switchMap also can be add also can call HTTP direct here (without service)
        mergeMap((action) => this.todoService.addTodo(action.payload).pipe(
          // #13 - let's put all business logic here, and push to reducers only results
          // also here we can create a MODEL
          map(todo => CreatedTodo({payload: todo})),
          // #14 - also can set as REDUX action
          catchError(() => EMPTY)
        ))
    ));

    removeTodo$ = createEffect(() =>
    this.actions$.pipe(
        ofType(RemoveTodo),
        mergeMap((action) => this.todoService.removeTodo(action.payload).pipe(
            map(todo => RemovedTodo({payload: todo})),
            catchError(() => EMPTY)
        ))
    ));

    editTodo$ = createEffect(() =>
    this.actions$.pipe(
        ofType(EditTodo),

        mergeMap((action) => this.todoService.editTodo(action.payload).pipe(
            map(todo => EditedTodo({payload: todo})),
            catchError(() => EMPTY)
        ))
    ));

    completeTodo$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CompleteTodo),
        //concatLatestFrom(action => this.store.select(getTodo(action.payload.id))),
        mergeMap((action) => this.todoService.updateTodo(action.payload).pipe(
            map(todo => CompletedTodo({payload: todo})),
            catchError(() => EMPTY)
        ))
    ));

    restoreTodo$ = createEffect(() =>
    this.actions$.pipe(
        ofType(RestoreTodo),
        mergeMap((action) => this.todoService.updateTodo(action.payload).pipe(
            map(todo => RestoredTodo({payload: todo})),
            catchError(() => EMPTY)
        ))
    ));

    loadAllTodos$ = createEffect(() =>
    this.actions$.pipe(
        ofType(GetAllTodos),
        mergeMap(() => this.todoService.getTodos().pipe(
            map((todos) => GotAllTodos({payload: todos}))
        ))
    ));
}
