import GraphModel from "./graph";
import AbstractModel from "./abstract-model";
import getStore, {StoreType} from "../store/index";

export type GraphsType = Record<string, GraphModel>

export default class GraphsModel extends AbstractModel {
  private _graphs: GraphsType = {};
  private _store: StoreType;

  constructor(graphs: GraphsType = {} as GraphsType) {
    super();

    this._store = getStore();
    this._graphs = graphs
  }

  getGraphs() {
    return Object.values(this._graphs)
  }

  getAll() {
    return this._graphs
  }

  setGraphs(graphs: GraphsType) {
    this._graphs = { ...graphs};

    this._callDataChangeHandlers()
  }

  removeGraph(id: string) {
    if (this._graphs[id]) {
      return false;
    }

    const graphs = { ...this._graphs };

    delete graphs[id];

    this._graphs = graphs;

    this._callDataChangeHandlers()

    return true;
  }

  updateGraph(id: string, graph: GraphModel) {
    if (this._graphs[id]) {
      return false;
    }

    this._graphs = { ...this._graphs, [id]: graph };

    this._callDataChangeHandlers()

    return true;
  }

  addGraph(graph: GraphModel) {
    this._graphs = {...this._graphs, [graph.id]: graph}
    this._callDataChangeHandlers()

    this._store.setItem(graph.id, graph)
  }
}
