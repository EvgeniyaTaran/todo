// #1 - it was missed on package.json, compile error
import { Guid } from 'guid-typescript';
import { Status } from './todo-status';

export class Todo {
  // #2 - Public - By default, members (properties and methods) of the TypeScript class are public - so you don’t need to prefix members with the public keyword.
  id: string;
  title: string;
  description: string;
  state: Status;
  constructor(title: string, description: string, state = Status.Active) {
    // #3 - it's a good way to reduce a quantity of external packages. For this certain case we can generate `id` with Math.random or Date.now() so on
    this.id = String(Date.now());
    this.title = title;
    this.description = description;
    this.state = state;
  }
}
