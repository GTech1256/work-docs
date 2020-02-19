import AppComponent from "./components/app";
import GraphsModel, { GraphsType } from './models/graphs';
import GraphModel from './models/graph';
import AppPresenter from './presenters/app';
import getStore from "./store/index";
import {render} from './utils/render';

const store = getStore();

const graphsRaw = store.getAll();

const graphs = {} as GraphsType;

Object.values(graphsRaw).map((graph) => { graphs[graph.id] = new GraphModel(graph)})

const graphsModel = new GraphsModel(graphs);

const appElement = document.querySelector('#app') as HTMLElement;
const appComponent = new AppComponent();

render(appElement, appComponent)

const appPresenter = new AppPresenter(appComponent, graphsModel);

appPresenter.render();
