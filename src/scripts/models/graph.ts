/** https://repl.it/@ziyoshams/Graph-JS */
import AbstractModel from "./abstract-model";

export type GraphType = Map<string, string[]>

export type IGraphModel = {
  id: string
  AdjList?: GraphType
}

type VisitedObject = Record<string, boolean>

export default class GraphModel extends AbstractModel {
  id: string;
  AdjList: GraphType;

  constructor({ id, AdjList = new Map() }: IGraphModel) {
    super()

    this.id = id
    this.AdjList = AdjList
  }

  addVertex(vertex: string) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, []);
      this._callDataChangeHandlers();
    } else {
      throw `Вершина ${vertex} уже существует`;
    }
  }

  getVertex() {
    return Array.from(this.AdjList.keys())
  }

  addEdge(vertexFrom: string, vertexTo: string) {
    if (!this.AdjList.has(vertexFrom)) {
      throw `Вершина ${vertexFrom} не найдена`;
    }

    if (!this.AdjList.has(vertexTo)){
      throw `Вершина ${vertexTo} не найдена`;
    }

    let edgedVertexs = this.AdjList.get(vertexFrom);

    if(!edgedVertexs.includes(vertexTo)) {
      edgedVertexs.push(vertexTo);
      this._callDataChangeHandlers();
    } else {
      throw `Невозможно добавить связь ${vertexFrom} -> ${vertexTo}, так как она уже установлена`;
    }
  }

  getEdges() {
    return Array.from(this.AdjList.values())
  }


  print() {
    for (let [key, value] of Array.from(this.AdjList)) {
      console.log(key, value);
    }
  }

  createVisitedObject(){
    let arr: Record<string, boolean> = {};

    for(let key of Array.from(this.AdjList.keys())){
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
      let current = q.pop()
      let arr = this.AdjList.get(current);

      for(let elem of arr){
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

    let arr = this.AdjList.get(startingNode);

    for(let elem of arr){
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
      let node = q.pop();
      path.push(node);
      let elements = this.AdjList.get(node);

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
