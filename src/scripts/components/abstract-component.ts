import {createElement} from '../utils/render';
import {IStore} from "../store/index";

const HIDDEN_CLASS = `visually-hidden`;

export default class AbstractComponent {
  private _element: null | HTMLElement = null;
  private _store: null | IStore = null;

  constructor(store: IStore = null) {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._store = store;
  }

  get store() {
    if (!this._store) {
      throw new Error(`Store не инцилизирован в компоненте`)
    }

    return this._store;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate() as unknown as string);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}
