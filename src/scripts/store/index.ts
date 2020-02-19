import { GraphsType } from "../models/graphs";

const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

type IStoreData = GraphsType

export type IStore = typeof Store;
export type StoreType = Store;

class Store {
  private _storage: Storage;
  private _store: IStoreData;
  private _storeKey: string;

  constructor(key: string, storage: Storage) {
    this._storage = storage;
    this._storeKey = key;

    try {
      this._store = JSON.parse(this._storage.getItem(this._storeKey)) as IStoreData | null || {};
    } catch (err) {
      this._store = {}
    }
  }

  getAll() {
    return { ...this._store };
  }

  setItem(key: string, value: any) {
    const store = this.getAll();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {[key]: value})
        )
    );
  }

  removeItem(id: string) {
    if (this._store[id]) {
      delete this._store[id]
      this._save();
      return true
    }

    throw `Обьекта с ${id} не найдено для удаления`
  }

  private _save() {
    this._storage.setItem(
      this._storeKey,
      JSON.stringify(
          Object.assign({}, this._store)
      )
  );
  }
}

const existStore = new Store(STORE_NAME, window.localStorage);

export default function getStore() {

  return existStore;
}
