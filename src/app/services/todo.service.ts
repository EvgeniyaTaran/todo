import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";
import { Observable } from 'rxjs';
import { EditData } from "../models/todo-edit-data";
import { map, mergeMap } from  'rxjs/operators';
import { TodoState } from "../store/reducers/todos.reducer";

@Injectable()
// #23 - https://angular.io/guide/singleton-services
export class TodoService {
    constructor(private http: HttpClient) {}

    // private url: string = "http://localhost:3000";

    addTodo(payload: Todo): Observable<Todo> {
        return this.http.post<Todo>(`api/todos`, payload);
    }

    editTodo(payload: EditData): Observable<Todo> {
        return this.http.put<Todo>(`api/todos/${payload.id}`, payload);
    }

    updateTodo(payload: Todo): Observable<Todo> {
        return this.http.put<Todo>(`api/todos/${payload.id}`, payload);
    }

    removeTodo(payload: Todo): Observable<Todo> {
        return this.http.delete<Todo>(`$api/todos/${payload.id}`);
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get<{data: Todo[]}>(`api/todos`).pipe(
            map((response) => response.data)
        );
    }
}

