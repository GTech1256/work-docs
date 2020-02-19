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
interface IRoute { title: string, url: string, name: RouterName }
type RouteType = (id?: string) => IRoute

const Route: Record<
  RouterName,
  RouteType
> =
{
    [RouterName.DOCUMENTS]: () => ({ title: 'documents', url: '/', name: RouterName.DOCUMENTS }),
    [RouterName.DOCUMENT]: (id: string) => ({ title: `document ${id}`, url: `/document/${id}`, name: RouterName.DOCUMENT })
}

export default class AppPresenter {
  private _container: AbstractComponent;
  private _graphsModel: GraphsModel;
  private _activeRouter: IRoute;

  private _documentsComponent: DocumentsComponent;
  private _documentComponent: DocumentComponent;
  private _documentPresenter: DocumentPresenter;

  constructor(container: AbstractComponent, graphsModel: GraphsModel) {
    this._container = container;

    this._graphsModel = graphsModel;
    this._graphsModel.setDataChangeHandler(() => this._onDataChange());

    this._renderDocumentsComponent();


    this._documentComponent = new DocumentComponent();
    this._documentPresenter = new DocumentPresenter(this._documentComponent, this._graphsModel);

    this._activeRouter = Route[RouterName.DOCUMENT]();
  }

  render() {

    this._documentPresenter.render();
    this._documentPresenter.hide();
    render(this._container.getElement(), this._documentsComponent);

  }

  _onRouteChange(route: IRoute) {
    this._activeRouter = route;

    history.replaceState(null, route.title, route.url)


    switch (this._activeRouter.name) {
      case RouterName.DOCUMENT:
        this._documentComponent.hide();
        this._documentPresenter.show();
        break;
      case RouterName.DOCUMENTS:
        this._documentPresenter.hide();
        this._documentComponent.show();
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

    remove(this._documentsComponent)
    this._renderDocumentsComponent();
  }
}
