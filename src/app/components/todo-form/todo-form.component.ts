import { Component, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import { Todo } from "../../models/todo";

@Component({
    selector: "todo-form",
    templateUrl: './todo-form.component.html',
    styleUrls: ['./todo-form.component.scss'],
    // #10 - it's not good practice to use ViewEncapsulation.None, please remove it and use internal scope of component
    encapsulation: ViewEncapsulation.None
  })
  export class TodoFormComponent {
    todoModel = {
      title: '',
      description: ''};

    @Output()
    public todoAdded = new EventEmitter<Todo>();
    public onAdd() {
      let todo = new Todo(this.todoModel.title, this.todoModel.description)
      this.todoAdded.emit(todo);
      this.todoModel.title = '';
      this.todoModel.description = '';
    }
  }
