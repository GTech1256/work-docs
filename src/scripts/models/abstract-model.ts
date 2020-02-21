type cb = () => void;

export default abstract class AbstractModel {
  private _dataChangeHandlers: cb[];

  constructor() {
    this._dataChangeHandlers = [];
  }

  setDataChangeHandler(handler: cb) {
    this._dataChangeHandlers.push(handler);
  }

  protected _callDataChangeHandlers() {
    this._dataChangeHandlers.forEach(handler => handler());
  }
}
