import {render, remove} from '../utils/render';
import GraphsModel from '../models/graphs';
import AbstractComponent from '../components/abstract-component';
import DocumentsComponent from '../components/documents';
import DocumentComponent from '../components/document';
import DocumentPresenter from './document';
import GraphModel from '../models/graph';

enum RouterName {
  "DOCUMENTS",
  "DOCUMENT"
}
type IRoute <T> = { title: string, url: string, name: RouterName, data: T };
type RouteType <T> = (id?: string) => IRoute<T>

interface IDocumentData { id: string }

const Route: Record<
  RouterName,
  RouteType<null | IDocumentData>
> =
{
    [RouterName.DOCUMENTS]: () => ({ title: 'documents', url: '/', name: RouterName.DOCUMENTS, data: null }),
    [RouterName.DOCUMENT]: (id: string) => ({ title: `document ${id}`, url: `/document/${id}`, name: RouterName.DOCUMENT, data: { id } })
}

export default class AppPresenter {
  private _container: AbstractComponent;
  private _graphsModel: GraphsModel;

  private _openedGraph: GraphModel | null = null;
  private _activeRouter: IRoute<null | IDocumentData> = Route[RouterName.DOCUMENTS]() as IRoute<null>;

  private _documentsComponent: DocumentsComponent;
  private _currentDocumentPresenter: DocumentPresenter | null;

  constructor(container: AbstractComponent, graphsModel: GraphsModel) {
    this._container = container;

    this._graphsModel = graphsModel;
    this._graphsModel.setDataChangeHandler(() => this._onDataChange());

    this._renderDocumentsComponent();
  }

  render() {
    render(this._container.getElement(), this._documentsComponent);
    this._documentsComponent.hide();

    this._onRouteChange(this._activeRouter)
  }

  _onRouteChange(route: IRoute<IDocumentData | null>) {

    this._activeRouter = route;

    history.replaceState(null, route.title, route.url)

    switch (this._activeRouter.name) {
      case RouterName.DOCUMENT:
        console.log("DOCUMENT", this._activeRouter);
        const data = route.data as IDocumentData
        this._openedGraph = this._graphsModel.getAll()[data.id]

        // останавливает выполнение при отстутсвии документы с переданным id
        if (!this._openedGraph) {
          alert("Выбранный документ не найден")
          return;
        }

        // скрывает лист документов
        this._documentsComponent.hide();

        // удаляет старый компонент
        if (this._currentDocumentPresenter) {
          this._currentDocumentPresenter.remove();
          console.log("REMOVE", new Error());

        } else {
          console.log("NON-REMOVE");
        }

        // создает и отображает документ
        this._currentDocumentPresenter = new DocumentPresenter(this._container, this._openedGraph);
        this._currentDocumentPresenter.render();
        console.log("RENDER");

        break;
      case RouterName.DOCUMENTS:
        console.log("DOCUMENTS");

        // удаляет старый компонент
        if (this._currentDocumentPresenter) {
          this._currentDocumentPresenter.remove();
        }
        this._documentsComponent.show();
        break;
    }
  }

  private _renderDocumentsComponent() {
    this._documentsComponent = new DocumentsComponent(this._graphsModel);

    this._documentsComponent.setOnClickGraph((graphId) => {
      this._onRouteChange(Route[RouterName.DOCUMENT](graphId))
    })
    this._documentsComponent.setOnAddNewDocument(() => {
      this._graphsModel.addGraph(new GraphModel({ id: new Date().getTime() + ""  }))
    })

    render(this._container.getElement(), this._documentsComponent);
  }

  private _onDataChange() {
    remove(this._container)
    this.render();
  }
}
