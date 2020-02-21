import { GraphsType } from "../models/graphs";
import GraphModel, { GraphType, GraphRawType } from "../models/graph";

const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

type IStoreRawData = Record<string, {id: string, adjList?: GraphRawType }>

export type IStore = typeof Store;
export type StoreType = Store;

class Store {
  private _storage: Storage;
  private _store: IStoreRawData;
  private _storeKey: string;

  constructor(key: string, storage: Storage) {
    this._storage = storage;
    this._storeKey = key;

    try {
      const storeString = this._storage.getItem(this._storeKey) || "{}"
      const storeRaw = JSON.parse(storeString) as IStoreRawData;

      const store = {} as IStoreRawData
      Object.entries(storeRaw).forEach(([id, graphRaw]) => {
        store[id] = {id: graphRaw.id, adjList: graphRaw.adjList } ;
      })
      this._store = store
    } catch (err) {
      this._store = {}
    }
  }

  getAll() {
    return { ...this._store };
  }

  setItem(key: string, value: GraphModel) {
    const rawValue = value.raw
    this._store = {
      ...this._store,
      [key]: {
        id: rawValue.id,
        adjList: Array.from(rawValue.adjList)
      }
    }

    // this._storage.setItem(
    //     this._storeKey,
    //     JSON.stringify(this._store)
    // );
  }

  removeItem(id: string) {
    if (this._store[id]) {
      delete this._store[id]
      this.save();
      return true
    }

    throw `Обьекта с ${id} не найдено для удаления`
  }

  save() {
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
