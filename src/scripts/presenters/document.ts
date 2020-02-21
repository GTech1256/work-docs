// import LoadMoreButtonComponent from '../components/load-more-button';
// import TasksComponent from '../components/tasks';
import GraphModel, { GraphPosition } from '../models/graph';
// import SortComponent, {SortType} from '../components/sort';
// import NoTasksComponent from '../components/no-tasks';
// import {render, remove, RenderPosition} from '../utils/render';
// import TaskController, {Mode as TaskControllerMode, EmptyTask} from './task';
import DocumentComponent, { CLASS_NAME } from '../components/document';
import DocumentTableEdges from '../components/document-table-edges';
import DocumentTableVertex from '../components/document-table-vertex';
import DocumentCanvasEdges from '../components/document-canvas-edges';
import { render, remove } from '../utils/render';
import AbstractComponent from '../components/abstract-component';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// const renderGraphs = (taskListElement, tasks, onDataChange, onViewChange) => {
//   return tasks.map((task) => {
//     const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
//     taskController.render(task, TaskControllerMode.DEFAULT);

//     return taskController;
//   });
// };

export enum TableShow {
  EDGES = "edges",
  VERTEX = "vertex"
}

export default class DocumentPresenter {
  private _container: AbstractComponent;

  private _graphModel: GraphModel;
  private _documentComponent: DocumentComponent;

  private _currentTableView: TableShow = TableShow.VERTEX;

  private _documentTableEdges: DocumentTableEdges;
  private _documentTableVertex: DocumentTableVertex;

  constructor(container: AbstractComponent, graph: GraphModel) {
    this.changeTableView = this.changeTableView.bind(this);
    this.handleVertexAdd = this.handleVertexAdd.bind(this);
    this.rerender = this.rerender.bind(this);

    this._graphModel = graph;
    this._graphModel.setDataChangeHandler(this.rerender)

    this._container = container
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const isDocumentEmpty = this._graphModel.getVertex().length === 0
    this._documentComponent = new DocumentComponent(isDocumentEmpty);
    this._documentComponent.setOnAddVertex(this.handleVertexAdd)

    render(this._container.getElement(), this._documentComponent);

    if (!isDocumentEmpty) {
      this._documentComponent.setOnChangeViewType(this.changeTableView)

      const tableSideElement = this._documentComponent
        .getElement()
        .querySelector('.table') as HTMLElement | null

      if (!tableSideElement) {
        throw new Error("DOMNode с классом .table не найдена")
      }

      // создает и рендерит таблицу с ребрами
      this._documentTableEdges = new DocumentTableEdges(this._graphModel)
      render(tableSideElement, this._documentTableEdges);
      this._documentTableEdges.hide()

      // создает и рендерит таблицу с вершинами
      this._documentTableVertex = new DocumentTableVertex(this._graphModel)
      render(tableSideElement, this._documentTableVertex);
      this._documentTableVertex.hide()

      // отображает нужную таблицу
      this.changeTableView(this._currentTableView)
    }
  }

  remove() {
    remove(this._documentComponent)
  }

  rerender() {
    this.remove()
    this.render()
  }

  private changeTableView(view: TableShow) {
    this._currentTableView = view;

    if (this._currentTableView === TableShow.EDGES) {
      this._documentTableEdges.show()
      this._documentTableVertex.hide()
      return;
    }

    this._documentTableEdges.hide()
    this._documentTableVertex.show()
  }

  private handleVertexAdd (vertexName: string, position: GraphPosition) {
    try {
      this._graphModel.addVertex(vertexName, position);
    } catch(e) {
      alert(e)
    }
  }
}
