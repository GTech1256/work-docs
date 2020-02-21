// import LoadMoreButtonComponent from '../components/load-more-button';
// import TasksComponent from '../components/tasks';
import GraphModel, { GraphPosition } from '../models/graph';
// import SortComponent, {SortType} from '../components/sort';
// import NoTasksComponent from '../components/no-tasks';
// import {render, remove, RenderPosition} from '../utils/render';
// import TaskController, {Mode as TaskControllerMode, EmptyTask} from './task';
import DocumentComponent, { CLASS_NAME } from '../components/document/document';
import DocumentTableEdgesComponent from '../components/document/document-table-edges/document-table-edges';
import DocumentTableVertexComponent from '../components/document/document-table-vertex/document-table-vertex';
import DocumentCanvasEdgesComponent from '../components/document-canvas-edges/document-canvas-edges';
import { render, remove } from '../utils/render';
import AbstractComponent from '../components/common/abstract-component';


export enum TableShow {
  EDGES = "edges",
  VERTEX = "vertex"
}

export default class DocumentPresenter {
  private _container: AbstractComponent;

  private _graphModel: GraphModel;

  private _currentTableView: TableShow = TableShow.VERTEX;

  private _documentComponent: DocumentComponent;
  private _documentTableEdgesComponent: DocumentTableEdgesComponent;
  private _documentTableVertexComponent: DocumentTableVertexComponent;
  private _documentCanavsComponent: DocumentCanvasEdgesComponent;

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

      const canvasSideElement = this._documentComponent
        .getElement()
        .querySelector('.canvas') as HTMLElement | null

      const tableSideElement = this._documentComponent
        .getElement()
        .querySelector('.table') as HTMLElement | null

      if (!tableSideElement) {
        throw new Error("DOMNode с классом .table не найдена")
      }

      if (!canvasSideElement) {
        throw new Error("DOMNode с классом .canvas не найдена")
      }


      render(canvasSideElement, new DocumentCanvasEdgesComponent(this._graphModel))

      // создает и рендерит таблицу с ребрами
      this._documentTableEdgesComponent = new DocumentTableEdgesComponent(this._graphModel)
      render(tableSideElement, this._documentTableEdgesComponent);
      this._documentTableEdgesComponent.hide()

      // создает и рендерит таблицу с вершинами
      this._documentTableVertexComponent = new DocumentTableVertexComponent(this._graphModel)
      render(tableSideElement, this._documentTableVertexComponent);
      this._documentTableVertexComponent.hide()

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
      this._documentTableEdgesComponent.show()
      this._documentTableVertexComponent.hide()
      return;
    }

    this._documentTableEdgesComponent.hide()
    this._documentTableVertexComponent.show()
  }

  private handleVertexAdd (vertexName: string, position: GraphPosition) {
    try {
      this._graphModel.addVertex(vertexName, position);
    } catch(e) {
      alert(e)
    }
  }
}
