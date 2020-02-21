/** https://repl.it/@ziyoshams/Graph-JS */
import AbstractModel from "./abstract-model";

export type GraphPosition = [number, number]

export type GraphValueType = { connectedEdges: string[], position: GraphPosition }
export type GraphKeyType = string
export type GraphRawType = [string, GraphValueType][]
export type GraphType = Map<GraphKeyType, GraphValueType>

export type IGraphModel = {
  id: string
  adjList?: GraphType
}

type VisitedObject = Record<GraphKeyType, boolean>

export default class GraphModel extends AbstractModel {
  id: string;
  private _adjList: GraphType;

  constructor({ id, adjList = new Map() }: IGraphModel) {
    super()

    this.id = id
    this._adjList = adjList
  }

  get raw() {
    return {
      id: this.id,
      adjList: this._adjList
    }
  }

  getAll() {
    return Array.from(this._adjList)
  }

  addVertex(vertex: string, position: GraphPosition) {
    if (this._adjList.has(vertex)) {
      throw `Вершина с именем "${vertex}" уже существует`;

    }

    this._adjList.set(vertex, { connectedEdges: [], position});
    this._callDataChangeHandlers();
  }

  getVertex() {
    return Array.from(this._adjList.keys())
  }

  addEdge(vertexFrom: string, vertexTo: string) {
    if (!this._adjList.has(vertexFrom)) {
      throw `Вершина ${vertexFrom} не найдена`;
    }

    if (!this._adjList.has(vertexTo)){
      throw `Вершина ${vertexTo} не найдена`;
    }

    const graphDataType = this._adjList.get(vertexFrom) as GraphValueType;
    let edgedVertexs = graphDataType.connectedEdges;

    if(!edgedVertexs.includes(vertexTo)) {
      edgedVertexs.push(vertexTo);
      this._callDataChangeHandlers();
    } else {
      throw `Невозможно добавить связь ${vertexFrom} -> ${vertexTo}, так как она уже установлена`;
    }
  }

  getEdges() {
    return Array.from(this._adjList.values())
  }


  print() {
    for (let [key, value] of Array.from(this._adjList)) {
      console.log(key, value);
    }
  }

  createVisitedObject(){
    let arr: Record<string, boolean> = {};

    for(let key of Array.from(this._adjList.keys())){
      arr[key] = false;
    }

    return arr;
  }

  /**
   * Breadth First Search
   */
  bfs(startingNode: string){
    let visited = this.createVisitedObject();
    let q = [];

    visited[startingNode] = true;
    q.push(startingNode);

    while(q.length){
      let current = q.pop() as string
      let arr = this._adjList.get(current) as GraphValueType;

      for(let elem of arr.connectedEdges){
        if(!visited[elem]){
          visited[elem] = true;
          q.unshift(elem)
        }
      }

    }
  }

  /**
   * Depth First Search
   */
  dfs(startingNode: string){
    let visited = this.createVisitedObject();
    this.dfsHelper(startingNode, visited);
  }

  dfsHelper(startingNode: string, visited: VisitedObject){
    visited[startingNode] = true;

    let arr = this._adjList.get(startingNode) as GraphValueType;

    for(let elem of arr.connectedEdges){
      if(!visited[elem]){
        this.dfsHelper(elem, visited);
      }
    }
  }

  doesPathExist(firstNode: string, secondNode: string){
    let path = [];
    let visited = this.createVisitedObject();
    let q = [];

    visited[firstNode] = true;
    q.push(firstNode);

    while (q.length) {
      let node = q.pop() as string;
      path.push(node);
      const graphDataType = this._adjList.get(node) as GraphValueType;

      let elements = graphDataType.connectedEdges

      if (elements.includes(secondNode)) {
        console.log(path.join('->'))
        return true;
      }

      for (let elem of elements) {
        if(!visited[elem]){
          visited[elem] = true;
          q.unshift(elem);
        }
      }
    }

    return false;
  }
}
