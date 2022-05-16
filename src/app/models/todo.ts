import { Guid } from 'guid-typescript';
import { TodoStatus } from './todo-status';

export class Todo {
  public id: string;
  public title: string;
  public description: string;
  public state: TodoStatus;
  constructor(title: string, description: string, state = TodoStatus.Active) {
    this.id = String(Guid.create()).substring(0,12);
    this.title = title;
    this.description = description;
    this.state = state;
  }
}
