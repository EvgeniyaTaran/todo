import { ActionType } from './action-type';

export class Action {
  private _type: ActionType;

  constructor(type: ActionType) {
    this._type = type;
  }
  get type(): ActionType {
    return this._type;
  }

}
