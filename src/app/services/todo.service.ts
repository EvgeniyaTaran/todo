import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";
import { Observable } from 'rxjs';
import { EditData } from "../models/todo-edit-data";

@Injectable()
// #23 - https://angular.io/guide/singleton-services
export class TodoService {
    constructor(private http: HttpClient) {}

    private url: string = "http://localhost:3000";

    addTodo(payload: Todo): Observable<Todo> {
        return this.http.post<Todo>(`${this.url}/todos`, payload);
    }

    editTodo(payload: EditData): Observable<Todo> {
        return this.http.put<Todo>(`${this.url}/todos/${payload.id}`, payload);
    }

    updateTodo(payload: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.url}/todos/${payload.id}`, payload);
    }

    removeTodo(payload: Todo): Observable<Todo> {
        return this.http.delete<Todo>(`${this.url}/todos/${payload.id}`);
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.url}/todos`);
    }
}

