// #1 - it was missed on package.json, compile error
import { Guid } from 'guid-typescript';
import { TodoStatus } from './todo-status';

export class Todo {
  // #2 - Public - By default, members (properties and methods) of the TypeScript class are public - so you don’t need to prefix members with the public keyword.
  public id: string;
  public title: string;
  public description: string;
  public state: TodoStatus;
  constructor(title: string, description: string, state = TodoStatus.Active) {
    // #3 - it's a good way to reduce a quantity of external packages. For this certain case we can generate `id` with Math.random or Date.now() so on
    this.id = String(Guid.create()).substring(0,12);
    this.title = title;
    this.description = description;
    this.state = state;
  }
}
